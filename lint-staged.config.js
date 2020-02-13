module.exports = {
  '*.js': 'eslint --ignore-pattern "!.*" --fix',
  '*.scss': ['stylelint --fix', 'stylelint --fix'],
  '*.{json,md,pug,y?(a)ml}': 'prettier --check --write'
}
