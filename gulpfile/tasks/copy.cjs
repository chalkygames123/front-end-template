const { join, posix } = require('node:path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');

const config = require('../../config.cjs');

const srcPaths = posix.join(config.get('srcDir'), 'public/**');

module.exports = function copy() {
	if (config.get('watch') && !lastRun(copy)) {
		watch(srcPaths, copy);
	}

	return src(srcPaths, {
		base: join(config.get('srcDir'), 'public'),
		nodir: true,
	})
		.pipe(gulpChanged(join(config.get('distDir'), config.get('publicPath'))))
		.pipe(dest(join(config.get('distDir'), config.get('publicPath'))));
};
