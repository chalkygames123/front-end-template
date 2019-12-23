const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')
const globby = require('globby')

const config = require('./config')

const isDev = config.get('mode') !== 'production'

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: config.get('mode'),
  entry() {
    return globby(config.get('srcPaths.scripts')).then(files =>
      Object.fromEntries(
        files.map(file => [
          path
            .relative(
              path.join(
                config.get('srcDir'),
                config.get('dir.assets'),
                config.get('dir.scripts')
              ),
              file
            )
            .replace(/\.[^.]+$/, ''),
          `./${file}`
        ])
      )
    )
  },
  output: {
    path: path.resolve(
      __dirname,
      config.get('distDir'),
      config.get('dir.assets'),
      config.get('dir.scripts')
    ),
    publicPath: path.join(
      config.get('site.basePath'),
      config.get('dir.assets'),
      config.get('dir.scripts')
    )
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'all',
          minSize: 0,
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(
            __dirname,
            config.get('dir.assets'),
            config.get('dir.scripts')
          )
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              cache: true
            }
          }
        ]
      }
    ]
  },
  devtool: isDev ? 'eval-source-map' : false,
  context: __dirname,
  plugins: [
    config.get('gzip') &&
      !isDev &&
      new CompressionPlugin({
        minRatio: 1
      })
  ].filter(Boolean)
}
