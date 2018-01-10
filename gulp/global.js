'use strict';

const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');

const plugins = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'ansi-regex',
		'autoprefixer',
		'browser-sync',
		'css-mqpacker',
		'event-stream',
		'imagemin-pngquant',
		'imagemin-webp',
		'postcss-assets',
		'vinyl-named',
		'webpack',
		'webpack-stream'
	]
});

const myServer = browserSync.create();

module.exports = {
	plugins: plugins,
	myServer: myServer
};
