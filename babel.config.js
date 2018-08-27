module.exports = api => {
  const config = {
    'presets': [
      ['@babel/preset-env', {
        'modules': false,
        'useBuiltIns': 'usage'
      }]
    ],
    'plugins': [
      'lodash'
    ]
  }

  api.cache(true)

  return config
}
