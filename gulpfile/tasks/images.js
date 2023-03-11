import { join, posix } from 'node:path';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpImagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';

import config from '../../config.cjs';
import { ignore, pipeIf } from '../utils/index.js';

const { dest, lastRun, src, watch } = gulp;

const sourcePaths = posix.join(
	config.get('srcDir'),
	'assets/images/**/*.+(png|jp?(e)g|gif|svg)',
);
const isDevelopment = config.get('mode') !== 'production';

export const images = () => {
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
