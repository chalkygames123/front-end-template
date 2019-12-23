module.exports = {
  '*.js': ['eslint --ignore-pattern "!.*" --fix', 'git add'],
  '*.scss': ['stylelint --fix', 'stylelint --fix', 'git add'],
  '*.{json,md}': ['prettier --check --write', 'git add']
}
