module.exports = api => {
  const env = process.env.NODE_ENV || 'production'

  const config = {
    'presets': [
      ['@babel/preset-env', {
        'modules': false,
        'useBuiltIns': 'usage'
      }]
    ],
    'plugins': [
      env === 'production' && 'lodash'
    ].filter(Boolean)
  }

  api.cache(true)

  return config
}
