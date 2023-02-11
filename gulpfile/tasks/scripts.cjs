const webpack = require('webpack');

const config = require('../../config.cjs');
const webpackConfig = require('../../webpack.config.cjs');

module.exports = function scripts(cb) {
	const compiler = webpack(webpackConfig);

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
