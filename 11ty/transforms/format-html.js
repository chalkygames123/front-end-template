const { extname } = require('node:path');

const { format, resolveConfig } = require('prettier');

const config = require('../../config');

const isDev = config.get('mode') !== 'production';

module.exports = async function formatHtml(content) {
	if (!['.html', '.php'].includes(extname(this.page.outputPath)) || isDev)
		return content;

	const options = await resolveConfig(this.page.outputPath, {
		editorconfig: true,
	});

	const result = format(content, {
		...options,
		filepath: this.page.outputPath,
		parser: 'html',
	});

	return result;
};
