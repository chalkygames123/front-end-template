'use strict';

const { join, posix } = require('node:path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');
const gulpImagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

const config = require('../../config.cjs');
const { ignore, pipeIf } = require('../utils/index.cjs');

const sourcePaths = posix.join(
	config.get('srcDir'),
	'assets/images/**/*.+(png|jp?(e)g|gif|svg)',
);
const isDevelopment = config.get('mode') !== 'production';

const images = () => {
	if (config.get('watch') && !lastRun(images)) {
		watch(sourcePaths, images);
	}

	return src(sourcePaths, {
		base: config.get('srcDir'),
	})
		.pipe(ignore())
		.pipe(gulpChanged(join(config.get('distDir'), config.get('publicPath'))))
		.pipe(
			pipeIf(
				!isDevelopment,
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

module.exports = images;
