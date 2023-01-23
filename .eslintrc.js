module.exports = {
	root: true,
	extends: ['@chalkygames123', 'prettier'],
	overrides: [
		{
			files: '*',
			excludedFiles: ['assets/scripts/**', 'modules/**'],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{
						optionalDependencies: false,
					},
				],
			},
		},
	],
};
