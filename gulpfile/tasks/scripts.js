import webpack from 'webpack';

import config from '../../config.cjs';
import webpackConfig from '../../webpack.config.cjs';

export const scripts = (callback) => {
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
