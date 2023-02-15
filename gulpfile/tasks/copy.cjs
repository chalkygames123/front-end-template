'use strict';

const { join, posix } = require('node:path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');

const config = require('../../config.cjs');

const sourcePaths = posix.join(config.get('srcDir'), 'public/**');

const copy = () => {
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

module.exports = copy;
