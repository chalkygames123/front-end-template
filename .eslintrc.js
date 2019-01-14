const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
  rules: {
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off'
  }
}
