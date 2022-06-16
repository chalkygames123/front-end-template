module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	order: 'concentric-css',
	overrides: [
		{
			files: '*.html',
			options: {
				printWidth: Number.POSITIVE_INFINITY,
			},
		},
	],
};
