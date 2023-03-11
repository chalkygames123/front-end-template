import { join, posix } from 'node:path';
import { Transform } from 'node:stream';

import { sass } from '@mr-hope/gulp-sass';
import CleanCSS from 'clean-css';
import { minify } from 'csso';
import gulp from 'gulp';
import gulpDependents from 'gulp-dependents';
import gulpSourcemaps from 'gulp-sourcemaps';
import postcss from 'postcss';
// eslint-disable-next-line import/default
import postcssLoadConfig from 'postcss-load-config';
import stylelint from 'stylelint';
import applySourceMap from 'vinyl-sourcemaps-apply';

import config from '../../config.cjs';
import { ignore, pipeIf } from '../utils/index.js';

const { dest, lastRun, src, watch } = gulp;
const { init, write } = gulpSourcemaps;
const { lint } = stylelint;

const sourcePaths = posix.join(config.get('srcDir'), 'assets/styles/**/*.scss');
const isDevelopment = config.get('mode') !== 'production';
const cleanCss = new CleanCSS({
	level: 2,
});

export const styles = () => {
	if (config.get('watch') && !lastRun(styles)) {
		watch(sourcePaths, styles);
	}

	return src(sourcePaths, {
		base: config.get('srcDir'),
		since: lastRun(styles),
	})
		.pipe(ignore())
		.pipe(gulpDependents())
		.pipe(
			new Transform({
				objectMode: true,
				async transform(file, encoding, callback) {
					const result = await lint({
						code: file.contents.toString(),
						codeFilename: file.path,
						formatter: 'string',
					});

					if (result.errored) {
						console.error(result.output.replace(/\n$/, ''));
					}

					callback(undefined, file);
				},
			}),
		)
		.pipe(pipeIf(isDevelopment, init()))
		.pipe(
			sass({
				sourceMapIncludeSources: true,
			}).on('error', sass.logError),
		)
		.pipe(
			new Transform({
				objectMode: true,
				async transform(file, encoding, callback) {
					const postcssConfig = await postcssLoadConfig();
					const processor = postcss(postcssConfig.plugins);
					const { css, map } = await processor
						.process(file.contents.toString(), {
							...postcssConfig.options,
							from: file.path,
							to: join(
								file.cwd,
								config.get('distDir'),
								config.get('publicPath'),
								file.relative,
							),
							map: {
								annotation: false,
							},
						})
						.then((result) => result);

					file.contents = Buffer.from(css);

					if (file.sourceMap) {
						const m = map.toJSON();

						m.sources = [file.relative];

						applySourceMap(file, m);
					}

					callback(undefined, file);
				},
			}),
		)
		.pipe(
			pipeIf(
				!isDevelopment,
				new Transform({
					objectMode: true,
					transform(file, encoding, callback) {
						const { css } = minify(file.contents.toString(), {
							forceMediaMerge: true,
						});

						file.contents = Buffer.from(css);

						callback(undefined, file);
					},
				}),
			),
		)
		.pipe(
			pipeIf(
				!isDevelopment,
				new Transform({
					objectMode: true,
					transform(file, encoding, callback) {
						const { styles: css } = cleanCss.minify(file.contents.toString());

						file.contents = Buffer.from(css);

						callback(undefined, file);
					},
				}),
			),
		)
		.pipe(
			pipeIf(
				isDevelopment,
				write({
					sourceRoot: join('/', config.get('srcDir')),
				}),
			),
		)
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
