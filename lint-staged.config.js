module.exports = {
  '*.js': 'eslint --ignore-pattern "!.*" --fix',
  '*.scss': ['stylelint --fix', 'stylelint --fix'],
  '*.{json,md}': 'prettier --check --write'
}
