const { rm } = require('fs/promises');

const config = require('../../config');

module.exports = function clean() {
	return rm(config.get('distDir'), {
		force: true,
		recursive: true,
	});
};
