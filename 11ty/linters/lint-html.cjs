'use strict';

const { extname } = require('node:path');

const {
	FileSystemConfigLoader,
	formatterFactory,
	HtmlValidate,
} = require('html-validate');

const loader = new FileSystemConfigLoader();
const htmlvalidate = new HtmlValidate(loader);
const formatter = formatterFactory('stylish');

const lintHtml = function (content) {
	if (!['.html', '.php'].includes(extname(this.page.outputPath))) return;

	const report = htmlvalidate.validateString(content, this.page.outputPath);

	if (report.valid) return;

	console.error(formatter(report.results));
};

module.exports = lintHtml;
