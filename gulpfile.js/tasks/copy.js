const path = require('path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');

const config = require('../../config');
const common = require('../common');

const srcPaths = path.posix.join(config.get('srcDir'), 'public/**');

module.exports = function copy() {
	if (config.get('watch') && !lastRun(copy)) {
		watch(srcPaths, copy);
	}

	return src(srcPaths, {
		base: path.join(config.get('srcDir'), 'public'),
		nodir: true,
	})
		.pipe(
			gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
		)
		.pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
		.pipe(common.server.stream());
};
