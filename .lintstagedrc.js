module.exports = {
  '*.js': ['eslint --ignore-pattern "!.*" --fix', 'git add'],
  '*.scss': ['stylelint --fix', 'stylelint --fix', 'git add'],
  '*.{json,md}': ['prettier --check --write', 'git add'],
  '.eslintrc.js': () => 'npm-run-all lint:scripts',
  '.stylelintrc.js': () => 'npm-run-all lint:styles',
  '.prettierrc.js': () => 'npm-run-all lint check:format'
}
