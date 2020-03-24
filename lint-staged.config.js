module.exports = {
  '*.js': 'eslint --fix',
  '*.scss': ['stylelint --fix', 'stylelint --fix'],
  '*': 'prettier --check --write',
}
