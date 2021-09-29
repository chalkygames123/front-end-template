const { rm } = require('fs/promises');
const { dirname, resolve } = require('path');

const config = require('../../config');

module.exports = function clean(cb) {
	if (
		dirname(process.cwd()).startsWith(dirname(resolve(config.get('distDir'))))
	) {
		cb(new Error('distDir cannot be a parent of or same as process.cwd()'));
	}

	return rm(config.get('distDir'), {
		force: true,
		recursive: true,
	});
};
