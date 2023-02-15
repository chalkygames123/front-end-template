'use strict';

const { join, posix } = require('node:path');
const { Transform } = require('node:stream');

const CleanCSS = require('clean-css');
const { minify } = require('csso');
const { dest, lastRun, src, watch } = require('gulp');
const gulpDependents = require('gulp-dependents');
const { sass } = require('@mr-hope/gulp-sass');
const { init, write } = require('gulp-sourcemaps');
const postcss = require('postcss');
const postcssLoadConfig = require('postcss-load-config');
const { lint } = require('stylelint');
const applySourceMap = require('vinyl-sourcemaps-apply');

const config = require('../../config.cjs');
const { ignore, pipeIf } = require('../utils/index.cjs');

const sourcePaths = posix.join(config.get('srcDir'), 'assets/styles/**/*.scss');
const isDevelopment = config.get('mode') !== 'production';
const cleanCss = new CleanCSS({
	level: 2,
});

const styles = () => {
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

module.exports = styles;
