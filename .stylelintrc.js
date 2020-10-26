module.exports = {
  extends: [
    'stylelint-config-twbs-bootstrap/scss',
    'stylelint-config-prettier',
  ],
  rules: {
    'alpha-value-notation': 'number',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'hue-degree-notation': 'angle',
    'no-empty-source': null,
    'order/order': [
      [
        {
          type: 'at-rule',
          name: 'extend',
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false,
        },
        'declarations',
        {
          type: 'at-rule',
          hasBlock: true,
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true,
        },
        'rules',
        {
          type: 'rule',
          selector: /^&::\w/,
        },
        {
          type: 'rule',
          selector: /^&:\w/,
        },
        {
          type: 'rule',
          selector: /^&/,
        },
      ],
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/at-each-key-value-single-line': true,
    'scss/at-function-named-arguments': [
      'never',
      {
        ignoreFunctions: ['color.adjust', 'color.change', 'color.scale'],
      },
    ],
    'scss/at-if-no-null': true,
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/comment-no-loud': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['after-dollar-variable', 'first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/function-color-relative': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/map-keys-quotes': 'always',
    'scss/no-duplicate-dollar-variables': [
      true,
      {
        ignoreInsideAtRules: ['if', 'mixin'],
      },
    ],
    'scss/no-global-function-names': true,
    'scss/partial-no-import': true,
    'scss/selector-no-union-class-name': true,
    'selector-class-pattern': null,
  },
}
