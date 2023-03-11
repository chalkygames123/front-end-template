import Eleventy from '@11ty/eleventy';

import config from '../../config.cjs';

export const templates = async () => {
	const eleventy = new Eleventy();

	await eleventy.init();

	await (config.get('watch') ? eleventy.watch() : eleventy.write());
};
