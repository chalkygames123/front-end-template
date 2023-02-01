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

const config = require('../../config');
const { ignore, pipeIf } = require('../utils');

const srcPaths = posix.join(config.get('srcDir'), 'assets/styles/**/*.scss');
const isDev = config.get('mode') !== 'production';
const cleanCss = new CleanCSS({
	level: 2,
});

module.exports = function styles() {
	if (config.get('watch') && !lastRun(styles)) {
		watch(srcPaths, styles);
	}

	return src(srcPaths, {
		base: config.get('srcDir'),
		since: lastRun(styles),
	})
		.pipe(ignore())
		.pipe(gulpDependents())
		.pipe(
			new Transform({
				objectMode: true,
				async transform(file, encoding, cb) {
					const result = await lint({
						code: file.contents.toString(),
						codeFilename: file.path,
						formatter: 'string',
					});

					if (result.errored) {
						// eslint-disable-next-line no-console
						console.error(result.output.replace(/\n$/, ''));
					}

					cb(null, file);
				},
			}),
		)
		.pipe(pipeIf(isDev, init()))
		.pipe(
			sass({
				sourceMapIncludeSources: true,
			}).on('error', sass.logError),
		)
		.pipe(
			new Transform({
				objectMode: true,
				async transform(file, encoding, cb) {
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

					// eslint-disable-next-line no-param-reassign
					file.contents = Buffer.from(css);

					if (file.sourceMap) {
						const m = map.toJSON();

						m.sources = [file.relative];

						applySourceMap(file, m);
					}

					cb(null, file);
				},
			}),
		)
		.pipe(
			pipeIf(
				!isDev,
				new Transform({
					objectMode: true,
					transform(file, encoding, cb) {
						const { css } = minify(file.contents.toString(), {
							forceMediaMerge: true,
						});

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(css);

						cb(null, file);
					},
				}),
			),
		)
		.pipe(
			pipeIf(
				!isDev,
				new Transform({
					objectMode: true,
					transform(file, encoding, cb) {
						const { styles: css } = cleanCss.minify(file.contents.toString());

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(css);

						cb(null, file);
					},
				}),
			),
		)
		.pipe(
			pipeIf(
				isDev,
				write({
					sourceRoot: join('/', config.get('srcDir')),
				}),
			),
		)
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
