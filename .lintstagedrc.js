export default {
	'*.{js,mjs,cjs,jsx}': ['eslint --fix', 'prettier --check --write'],
	'*.scss': ['stylelint --fix', 'stylelint --fix', 'prettier --check --write'],
	'!*.{js,mjs,cjs,jsx}|*.scss': 'prettier --check --write --ignore-unknown',
	'package.json': () => [
		'npm install --package-lock-only',
		'git add package-lock.json',
	],
};
