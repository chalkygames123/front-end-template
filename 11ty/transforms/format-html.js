/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const prettier = require('prettier');

const config = require('../../config');

const isDev = config.get('mode') !== 'production';

module.exports = async (content, outputPath) => {
	if (!/\.html$/.test(outputPath) || isDev) return content;

	const options = await prettier.resolveConfig(outputPath, {
		editorconfig: true,
	});

	const result = prettier.format(content, {
		...options,
		filepath: outputPath,
	});

	return result;
};
