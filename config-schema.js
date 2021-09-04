/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const convict = require('convict');

const schema = {
	srcDir: {
		format: String,
		default: '.',
		arg: 'src-dir',
	},
	distDir: {
		format: String,
		default: 'dist',
		arg: 'dist-dir',
	},
	publicPath: {
		format: String,
		default: '/',
	},
	mode: {
		format: ['production', 'development'],
		default: 'production',
		arg: 'mode',
	},
	watch: {
		format: Boolean,
		default: false,
		arg: 'watch',
	},
};

const config = convict(schema);

config.validate({
	allowed: 'strict',
});

module.exports = config;
