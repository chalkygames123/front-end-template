const pkg = require('./package.json')

module.exports = (api) => {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: pkg.dependencies['core-js'],
        },
      ],
    ],
  }
}
