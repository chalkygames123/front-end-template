/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const { format, resolveConfig } = require('prettier');

const config = require('../../config');

const isDev = config.get('mode') !== 'production';

module.exports = async function formatHtml(content) {
	if (!/\.html$/.test(this.outputPath) || isDev) return content;

	const options = await resolveConfig(this.outputPath, {
		editorconfig: true,
	});

	const result = format(content, {
		...options,
		filepath: this.outputPath,
	});

	return result;
};
