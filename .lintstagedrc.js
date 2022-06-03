module.exports = {
	'*.js': ['eslint --fix', 'prettier --check --write'],
	'*.scss': ['stylelint --fix', 'stylelint --fix', 'prettier --check --write'],
	'!*.js|*.scss': 'prettier --check --write --ignore-unknown',
};
