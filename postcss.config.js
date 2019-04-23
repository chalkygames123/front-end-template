// TODO: postcss-load-config が依存する cosmiconfig が v5 に更新されたら ESM syntax に書き直す

const autoprefixer = require('autoprefixer')
const postcssNormalize = require('postcss-normalize')
const postcssScss = require('postcss-scss')

module.exports = {
  syntax: postcssScss,
  plugins: [
    postcssNormalize(),
    autoprefixer({
      grid: 'autoplace'
    })
  ]
}
