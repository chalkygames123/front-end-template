'use strict';

const convict = require('convict');

const schema = {
	srcDir: {
		format: String,
		default: '.',
		env: 'SRC_DIR',
	},
	distDir: {
		format: String,
		default: 'dist',
		env: 'DIST_DIR',
	},
	publicPath: {
		format: String,
		default: '/',
		env: 'PUBLIC_PATH',
	},
	mode: {
		format: ['production', 'development'],
		default: 'production',
		env: 'MODE',
	},
	watch: {
		format: Boolean,
		default: false,
		env: 'WATCH',
	},
};

const config = convict(schema);

config.validate({
	allowed: 'strict',
});

module.exports = config;
