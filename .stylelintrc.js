/* eslint import/no-extraneous-dependencies: ["error", { "optionalDependencies": false }] */

const stylelintConfigRecessOrder = require('stylelint-config-recess-order')

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else']
      }
    ],
    'at-rule-no-unknown': null,
    'color-named': 'never',
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'function-calc-no-invalid': true,
    'no-empty-source': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'unicode-bom': 'never',
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend'
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false
        },
        'declarations',
        {
          type: 'at-rule',
          hasBlock: true
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true
        },
        'rules',
        {
          type: 'rule',
          selector: /^&::\w/
        },
        {
          type: 'rule',
          selector: /^&:\w/
        }
      ]
    ],
    'order/properties-order': [
      stylelintConfigRecessOrder.rules['order/properties-order'],
      {
        unspecified: 'bottomAlphabetical'
      }
    ],
    'scss/at-each-key-value-single-line': true,
    'scss/at-if-no-null': true,
    'scss/at-import-partial-extension': 'never',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-dollar-variable'],
        ignore: ['after-comment']
      }
    ],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/double-slash-comment-inline': [
      'never',
      {
        ignore: ['stylelint-commands']
      }
    ],
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/comment-no-loud': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/function-color-relative': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/partial-no-import': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/selector-no-union-class-name': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/no-duplicate-mixins': true
  }
}
