const path = require('path');
const { Transform } = require('stream');

const CleanCSS = require('clean-css');
const csso = require('csso');
const { dest, lastRun, src, watch } = require('gulp');
const gulpDependents = require('gulp-dependents');
const gulpPostcss = require('gulp-postcss');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpStylelint = require('gulp-stylelint');
const sass = require('sass');

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
			gulpStylelint({
				failAfterError: false,
				reporters: [
					{
						formatter: 'string',
						console: true,
					},
				],
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
						const result = csso.minify(file.contents.toString(), {
							forceMediaMerge: true,
						});

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(result.css);

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
						const result = cleanCss.minify(file.contents.toString());

						// eslint-disable-next-line no-param-reassign
						file.contents = Buffer.from(result.styles);

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
