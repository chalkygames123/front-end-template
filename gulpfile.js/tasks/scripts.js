const webpack = require('webpack');

const config = require('../../config');
const webpackConfig = require('../../webpack.config');

const compiler = webpack(webpackConfig);

module.exports = function scripts(cb) {
	const handler = (error, stats) => {
		// eslint-disable-next-line no-console
		console.log(
			stats.toString({
				colors: true,
			}),
		);

		cb();
	};

	if (config.get('watch')) {
		compiler.watch({}, handler);
	} else {
		compiler.run(handler);
	}
};
