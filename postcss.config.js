const autoprefixer = require('autoprefixer')
const postcssScss = require('postcss-scss')
const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

module.exports = {
  syntax: postcssScss,
  plugins: [
    stylelint(),
    autoprefixer({
      grid: 'autoplace'
    }),
    postcssReporter({
      clearReportedMessages: true,
      throwError: true
    })
  ]
}
