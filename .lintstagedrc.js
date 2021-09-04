/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const prettier = require('prettier');

const extensions = prettier
	.getSupportInfo()
	.languages.flatMap((info) => info.extensions);
const extensionsToExclude = ['.js', '.scss'];
const pattern = `*.{${extensions
	.filter((ext) => !extensionsToExclude.includes(ext))
	.map((ext) => ext.replace('.', ''))
	.join()}}`;

module.exports = {
	'*.js': ['prettier --check --write', 'eslint --fix'],
	'*.scss': ['prettier --check --write', 'stylelint --fix', 'stylelint --fix'],
	[pattern]: 'prettier --check --write',
};
