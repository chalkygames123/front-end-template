'use strict';

const { rm } = require('node:fs/promises');
const { dirname, resolve } = require('node:path');

const config = require('../../config.cjs');

const clean = (callback) => {
	if (
		dirname(process.cwd()).startsWith(dirname(resolve(config.get('distDir'))))
	) {
		callback(
			new Error("'distDir' cannot be outside of or same as process.cwd()"),
		);
	}

	return rm(config.get('distDir'), {
		force: true,
		recursive: true,
	});
};

module.exports = clean;
