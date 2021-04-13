const pkg = require('./package.json')

module.exports = (api) => {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: pkg.dependencies['core-js'],
          useBuiltIns: 'usage',
        },
      ],
    ],
  }
}
