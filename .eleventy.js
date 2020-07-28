/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const fs = require('fs')
const path = require('path')

const htmlMinifier = require('html-minifier')
const htmlhint = require('htmlhint').HTMLHint

const config = require('./config')

const isDev = config.get('mode') !== 'production'
const htmlhintRules = JSON.parse(fs.readFileSync('.htmlhintrc', 'utf8'))

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform('html-minifier', (content, outputPath) => {
    if (!/\.(html|php)$/.test(outputPath) || isDev) return content

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
      useShortDoctype: true,
    })

    return result
  })

  eleventyConfig.addLinter('htmlhint', (content, inputPath, outputPath) => {
    if (!outputPath.endsWith('.html')) return

    const result = htmlhint.verify(content, htmlhintRules)

    if (!result.length) return

    const report = htmlhint
      .format(result, {
        colors: true,
        indent: 4,
      })
      .reduce((acc, line) => `${acc}\n${line}`, '')

    // eslint-disable-next-line no-console
    console.error(
      `HTMLHint: ${result.length} error(s) found in ${outputPath}${report}\n`
    )
  })

  return {
    dir: {
      input: path.join(config.get('srcDir'), 'templates'),
      output: path.join(config.get('distDir'), config.get('publicPath')),
    },
    pathPrefix: config.get('publicPath'),
  }
}
