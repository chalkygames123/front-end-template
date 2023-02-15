'use strict';

const webpack = require('webpack');

const config = require('../../config.cjs');
const webpackConfig = require('../../webpack.config.cjs');

const scripts = (callback) => {
	const compiler = webpack(webpackConfig);

	const handler = (error, stats) => {
		console.log(
			stats.toString({
				colors: true,
			}),
		);

		callback();
	};

	if (config.get('watch')) {
		compiler.watch({}, handler);
	} else {
		compiler.run(handler);
	}
};

module.exports = scripts;
