const Eleventy = require('@11ty/eleventy');

const config = require('../../config');

module.exports = async function templates() {
	const eleventy = new Eleventy();

	await eleventy.init();

	if (config.get('watch')) {
		await eleventy.watch();
	} else {
		await eleventy.write();
	}
};
