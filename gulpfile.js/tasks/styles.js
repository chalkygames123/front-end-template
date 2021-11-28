const path = require('path');
const { Transform } = require('stream');

const CleanCSS = require('clean-css');
const csso = require('csso');
const { dest, lastRun, src, watch } = require('gulp');
const gulpDependents = require('gulp-dependents');
const gulpPostcss = require('gulp-postcss');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const sass = require('sass');
const stylelint = require('stylelint');

const config = require('../../config');
const common = require('../common');
const ignore = require('../utils/ignore');
const pipeIf = require('../utils/pipe-if');

const srcPaths = path.posix.join(
	config.get('srcDir'),
	'assets/styles/**/*.scss'
);
const isDev = config.get('mode') !== 'production';
const boundSass = gulpSass(sass);
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
					const result = await stylelint.lint({
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
			})
		)
		.pipe(pipeIf(isDev, gulpSourcemaps.init()))
		.pipe(boundSass().on('error', boundSass.logError))
		.pipe(gulpPostcss())
		.pipe(
			pipeIf(
				!isDev,
				new Transform({
					objectMode: true,
					transform(file, encoding, cb) {
						const { css: result } = csso.minify(file.contents, {
							forceMediaMerge: true,
						});

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(result);

						cb(null, file);
					},
				})
			)
		)
		.pipe(
			pipeIf(
				!isDev,
				new Transform({
					objectMode: true,
					transform(file, encoding, cb) {
						const { styles: result } = cleanCss.minify(file.contents);

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(result);

						cb(null, file);
					},
				})
			)
		)
		.pipe(
			pipeIf(
				isDev,
				gulpSourcemaps.write({
					sourceRoot: `/${config.get('srcDir')}`,
				})
			)
		)
		.pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
		.pipe(common.server.stream());
};
