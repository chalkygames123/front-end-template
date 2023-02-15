'use strict';

const Eleventy = require('@11ty/eleventy');

const config = require('../../config.cjs');

const templates = async () => {
	const eleventy = new Eleventy();

	await eleventy.init();

	await (config.get('watch') ? eleventy.watch() : eleventy.write());
};

module.exports = templates;
