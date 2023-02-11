const { extname } = require('node:path');

const {
	FileSystemConfigLoader,
	formatterFactory,
	HtmlValidate,
} = require('html-validate');

const loader = new FileSystemConfigLoader();
const htmlvalidate = new HtmlValidate(loader);
const formatter = formatterFactory('stylish');

module.exports = function lintHtml(content) {
	if (!['.html', '.php'].includes(extname(this.page.outputPath))) return;

	const report = htmlvalidate.validateString(content, this.page.outputPath);

	if (report.valid) return;

	// eslint-disable-next-line no-console
	console.error(formatter(report.results));
};
