import { join, posix } from 'node:path';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';

import config from '../../config.cjs';

const { dest, lastRun, src, watch } = gulp;

const sourcePaths = posix.join(config.get('srcDir'), 'public/**');

export const copy = () => {
	if (config.get('watch') && !lastRun(copy)) {
		watch(sourcePaths, copy);
	}

	return src(sourcePaths, {
		base: join(config.get('srcDir'), 'public'),
		nodir: true,
	})
		.pipe(gulpChanged(join(config.get('distDir'), config.get('publicPath'))))
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
