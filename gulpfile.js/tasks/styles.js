const { join, posix } = require('node:path');
const { Transform } = require('node:stream');

const browserslist = require('browserslist');
const { dest, lastRun, src, watch } = require('gulp');
const gulpDependents = require('gulp-dependents');
const gulpSass = require('gulp-sass');
const { init, write } = require('gulp-sourcemaps');
const lightningcss = require('lightningcss');
const postcss = require('postcss');
const postcssLoadConfig = require('postcss-load-config');
const sass = require('sass');
const { lint } = require('stylelint');
const applySourceMap = require('vinyl-sourcemaps-apply');

const config = require('../../config');
const packageConfig = require('../../package.json');
const ignore = require('../utils/ignore');
const pipeIf = require('../utils/pipe-if');

const srcPaths = posix.join(config.get('srcDir'), 'assets/styles/**/*.scss');
const isDev = config.get('mode') !== 'production';
const boundSass = gulpSass(sass);
const targets = lightningcss.browserslistToTargets(
	browserslist(packageConfig.browserslist),
);

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
		.pipe(boundSass().on('error', boundSass.logError))
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
						const { code: css } = lightningcss.transform({
							filename: file.relative,
							code: file.contents,
							minify: true,
							targets,
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
				isDev,
				write({
					sourceRoot: `/${config.get('srcDir')}`,
				}),
			),
		)
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
