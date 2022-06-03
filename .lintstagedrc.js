module.exports = {
	'*.js': ['prettier --check --write', 'eslint --fix'],
	'*.scss': ['prettier --check --write', 'stylelint --fix', 'stylelint --fix'],
	'!*.js|*.scss': 'prettier --check --write --ignore-unknown',
};
