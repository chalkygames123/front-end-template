const { join, posix } = require('node:path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');
const gulpImagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

const config = require('../../config.cjs');
const { ignore, pipeIf } = require('../utils/index.cjs');

const srcPaths = posix.join(
	config.get('srcDir'),
	'assets/images/**/*.+(png|jp?(e)g|gif|svg)',
);
const isDev = config.get('mode') !== 'production';

module.exports = function images() {
	if (config.get('watch') && !lastRun(images)) {
		watch(srcPaths, images);
	}

	return src(srcPaths, {
		base: config.get('srcDir'),
	})
		.pipe(ignore())
		.pipe(gulpChanged(join(config.get('distDir'), config.get('publicPath'))))
		.pipe(
			pipeIf(
				!isDev,
				gulpImagemin([
					imageminPngquant(),
					gulpImagemin.mozjpeg({
						quality: 85,
					}),
					gulpImagemin.gifsicle({
						optimizationLevel: 3,
					}),
					gulpImagemin.svgo({
						plugins: [
							{ cleanupIDs: false },
							{ removeUnknownsAndDefaults: false },
							{ removeUselessDefs: false },
							{ removeViewBox: false },
						],
					}),
				]),
			),
		)
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
