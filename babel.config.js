module.exports = (api) => {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: 3,
          useBuiltIns: 'usage',
        },
      ],
    ],
  }
}
