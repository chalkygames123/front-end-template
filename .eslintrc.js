const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.stylelintrc.js',
          'common.js',
          'config-schema.js',
          'gulpfile.js/**',
          'postcss.config.js',
          'webpack.config.js'
        ],
        optionalDependencies: false
      }
    ]
  }
}
