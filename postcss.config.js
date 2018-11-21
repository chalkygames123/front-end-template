const autoprefixer = require('autoprefixer')
const cssMqpacker = require('css-mqpacker')
const postcssAssets = require('postcss-assets')

const config = require('./config')

module.exports = {
  plugins: [
    autoprefixer({
      grid: true
    }),
    cssMqpacker({
      sort: true
    }),
    postcssAssets({
      basePath: config.distDir
    })
  ]
}
