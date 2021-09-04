const path = require('path');

const { dest, lastRun, src, watch } = require('gulp');
const gulpChanged = require('gulp-changed');

const config = require('../../config');
const common = require('../common');
const pipeIf = require('../utils/pipe-if');

const srcPaths = path.posix.join(config.get('srcDir'), 'public/**');
const isDev = config.get('mode') !== 'production';

module.exports = function copy() {
	if (config.get('watch') && !lastRun(copy)) {
		watch(srcPaths, copy);
	}

	return src(srcPaths, {
		base: path.join(config.get('srcDir'), 'public'),
		nodir: true,
	})
		.pipe(
			pipeIf(
				isDev,
				gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
			)
		)
		.pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
		.pipe(common.server.stream());
};
