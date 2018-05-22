const gulpConfig = require('./gulp/config')

const autoprefixer = require('autoprefixer')
const cssMqpacker = require('css-mqpacker')
const postcssAssets = require('postcss-assets')

module.exports = {
  plugins: [
    autoprefixer,
    cssMqpacker({
      sort: true
    }),
    postcssAssets({
      basePath: gulpConfig.paths.dest
    })
  ]
}
