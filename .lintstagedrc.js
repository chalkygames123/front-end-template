module.exports = {
	'*.js': ['eslint --fix', 'prettier --check --write'],
	'*.scss': ['stylelint --fix', 'prettier --check --write', 'stylelint --fix'],
	'!*.js|*.scss': 'prettier --check --write --ignore-unknown',
};
