module.exports = api => {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ]
  }
}
