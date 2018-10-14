const path = require('path')

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

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
