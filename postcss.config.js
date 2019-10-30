/* eslint import/no-extraneous-dependencies: ["error", { "optionalDependencies": false }] */

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
