const {
	FileSystemConfigLoader,
	formatterFactory,
	HtmlValidate,
} = require('html-validate');

const loader = new FileSystemConfigLoader();
const htmlvalidate = new HtmlValidate(loader);
const formatter = formatterFactory('stylish');

module.exports = function lintHtml(content) {
	if (!this.outputPath.endsWith('.html')) return;

	const report = htmlvalidate.validateString(content, this.outputPath);

	if (report.valid) return;

	// eslint-disable-next-line no-console
	console.error(formatter(report.results));
};
