const { isAbsolute, join } = require('node:path');

const config = require('./config.cjs');

module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-url': {
			url(asset) {
				if (isAbsolute(asset.url)) {
					return join(config.get('publicPath'), asset.url);
				}

				return asset.url;
			},
		},
	},
};
