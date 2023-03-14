import { join, posix } from 'node:path';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpImagemin, { gifsicle, mozjpeg, svgo } from 'gulp-imagemin';
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
					mozjpeg({
						quality: 85,
					}),
					gifsicle({
						optimizationLevel: 3,
					}),
					svgo({
						multipass: true,
						plugins: [
							{
								name: 'preset-default',
								params: {
									overrides: {
										removeUnknownsAndDefaults: {
											keepDataAttrs: false,
										},
										removeViewBox: false,
									},
								},
							},
							'convertStyleToAttrs',
							'reusePaths',
						],
					}),
				]),
			),
		)
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
