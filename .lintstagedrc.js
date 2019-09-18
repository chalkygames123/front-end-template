module.exports = {
  '*.js': ['eslint --ignore-pattern "!.*"'],
  '*.scss': ['stylelint'],
  '*.{json,md}': ['prettier --check']
}
