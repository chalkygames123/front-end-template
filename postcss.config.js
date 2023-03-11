import { isAbsolute, join } from 'node:path';

import config from './config.cjs';

export default {
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
