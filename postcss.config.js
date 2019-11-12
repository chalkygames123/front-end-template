const autoprefixer = require('autoprefixer')
const postcssScss = require('postcss-scss')
const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

const config = require('./config')

const isDev = config.get('env') === 'development'

module.exports = {
  syntax: postcssScss,
  plugins: [
    stylelint(),
    autoprefixer({
      grid: 'autoplace'
    }),
    postcssReporter({
      clearReportedMessages: true,
      throwError: !isDev
    })
  ]
}
