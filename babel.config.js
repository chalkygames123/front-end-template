const path = require('path')

const common = require(path.resolve('gulpfile.js/common'))

const isDev = common.env === 'development'

module.exports = api => {
  api.cache.forever()

  return {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        useBuiltIns: 'usage'
      }]
    ],
    plugins: [
      !isDev && 'lodash'
    ].filter(Boolean)
  }
}
