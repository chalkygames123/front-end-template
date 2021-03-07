module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'plugin:eslint-comments/recommended', 'prettier'],
  rules: {
    'eslint-comments/disable-enable-pair': [
      'error',
      {
        allowWholeFile: true,
      },
    ],
    'import/no-default-export': ['error'],
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
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
  },
}
