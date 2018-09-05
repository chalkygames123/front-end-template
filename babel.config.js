const config = require('./gulp/config')

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
      config.env.PRODUCTION && 'lodash'
    ].filter(Boolean)
  }
}
