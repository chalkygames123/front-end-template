module.exports = {
  extends: [
    'stylelint-config-twbs-bootstrap/scss',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else']
      }
    ],
    'declaration-block-no-redundant-longhand-properties': true,
    'function-calc-no-invalid': true,
    'no-empty-source': null,
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
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'scss/at-each-key-value-single-line': true,
    'scss/at-if-no-null': true,
    'scss/at-import-partial-extension': 'never',
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/comment-no-loud': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dimension-no-non-numeric-values': true,
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-dollar-variable'],
        ignore: ['after-comment']
      }
    ],
    'scss/double-slash-comment-inline': 'never',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/function-color-relative': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInsideAtRules: ['if', 'mixin']
      }
    ],
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': null,
    'scss/partial-no-import': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/selector-no-union-class-name': true,
    'selector-class-pattern': null
  }
}
