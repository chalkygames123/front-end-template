/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const fs = require('fs');

const { HTMLHint: htmlhint } = require('htmlhint');

const htmlhintRules = JSON.parse(fs.readFileSync('.htmlhintrc', 'utf8'));

module.exports = (content, inputPath, outputPath) => {
	if (!outputPath.endsWith('.html')) return;

	const result = htmlhint.verify(content, htmlhintRules);

	if (!result.length) return;

	const report = htmlhint
		.format(result, {
			colors: true,
			indent: 4,
		})
		.reduce((acc, line) => `${acc}\n${line}`, '');

	// eslint-disable-next-line no-console
	console.error(
		`HTMLHint: ${result.length} error(s) found in ${outputPath}${report}\n`
	);
};
