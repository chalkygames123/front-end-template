import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../../config.cjs';
import webpackConfig from '../../webpack.config.js';

export const scripts = (callback) => {
	const compiler = webpack(webpackConfig);

	if (config.get('watch')) {
		const server = new WebpackDevServer(webpackConfig.devServer, compiler);

		server.startCallback(callback);
	} else {
		compiler.run((error, stats) => {
			console.log(
				stats.toString({
					colors: true,
				}),
			);

			callback();
		});
	}
};
