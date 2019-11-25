module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ]
  },
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
