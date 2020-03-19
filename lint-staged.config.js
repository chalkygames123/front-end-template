module.exports = {
  '*.js': 'eslint --fix',
  '*.scss': ['stylelint --fix', 'stylelint --fix'],
  '*.{json,md,y?(a)ml}': 'prettier --check --write'
}
