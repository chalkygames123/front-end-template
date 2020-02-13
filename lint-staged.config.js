module.exports = {
  '*.js': 'eslint --ignore-pattern "!.*" --fix',
  '*.scss': ['stylelint --fix', 'stylelint --fix'],
  '*.{json,md,y?(a)ml}': 'prettier --check --write'
}
