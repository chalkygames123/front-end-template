const path = require('path')

const globby = require('globby')

const config = require('./config')

const isDev = config.get('mode') !== 'production'

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: config.get('mode'),
  entry() {
    return globby(
      path.posix.join(config.get('srcDir'), 'assets/scripts/**/!(_)*.js')
    ).then(files =>
      Object.fromEntries(
        files.map(file => [
          path
            .relative(path.join(config.get('srcDir'), 'assets/scripts'), file)
            .replace(/\.[^.]+$/, ''),
          `./${file}`
        ])
      )
    )
  },
  output: {
    path: path.join(
      __dirname,
      config.get('distDir'),
      config.get('publicPath'),
      'assets/scripts'
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
        include: [path.join(__dirname, config.get('srcDir'), 'assets/scripts')],
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
  context: __dirname
}
