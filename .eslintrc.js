module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: [
        'gulpfile.js/**',
        '.stylelintrc.js',
        'config-schema.js',
        'postcss.config.js'
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            optionalDependencies: false
          }
        ]
      }
    }
  ]
}
