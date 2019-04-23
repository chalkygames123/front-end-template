// TODO: postcss-load-config が依存する cosmiconfig が v5 に更新されたら ESM syntax に書き直す

const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')
const postcssScss = require('postcss-scss')
const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

module.exports = {
  syntax: postcssScss,
  plugins: [
    stylelint(),
    postcssNormalize(),
    autoprefixer({
      grid: 'autoplace'
    }),
    postcssReporter({
      clearReportedMessages: true,
      throwError: true
    })
  ]
}
