const config = require(require('path').resolve('config'))

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
      !config.isDev && 'lodash'
    ].filter(Boolean)
  }
}
