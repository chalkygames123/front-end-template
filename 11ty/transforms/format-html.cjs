'use strict';

const { extname } = require('node:path');

const { format, resolveConfig } = require('prettier');

const config = require('../../config.cjs');

const isDevelopment = config.get('mode') !== 'production';

const formatHtml = async function (content) {
	if (
		!['.html', '.php'].includes(extname(this.page.outputPath)) ||
		isDevelopment
	)
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

module.exports = formatHtml;
