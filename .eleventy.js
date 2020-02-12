const fs = require('fs')
const path = require('path')

const htmlMinifier = require('html-minifier')
const htmlhint = require('htmlhint').default
const signale = require('signale')

const config = require('./config')

const isDev = config.get('mode') !== 'production'
const htmlhintRules = JSON.parse(fs.readFileSync('.htmlhintrc', 'utf8'))

module.exports = eleventyConfig => {
  eleventyConfig.addTransform('html-minifier', (content, outputPath) => {
    if (outputPath.endsWith('.html') && !isDev) {
      const result = htmlMinifier.minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      })

      return result
    }

    return content
  })

  eleventyConfig.addLinter('htmlhint', (content, inputPath, outputPath) => {
    if (outputPath.endsWith('.html')) {
      const result = htmlhint.verify(content, htmlhintRules)

      if (result.length > 0) {
        const report = htmlhint
          .format(result, {
            colors: true,
            indent: 4
          })
          .reduce((acc, line) => {
            return `${acc}\n${line}`
          }, '')

        signale.error(
          `HTMLHint: ${result.length} error(s) found in ${outputPath}${report}\n`
        )
      }
    }
  })

  return {
    dir: {
      input: 'views',
      output: path.join(config.get('distDir'), config.get('publicPath'))
    },
    pathPrefix: config.get('publicPath')
  }
}
