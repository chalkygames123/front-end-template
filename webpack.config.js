const MinifyPlugin = require('babel-minify-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const gulpConfig = require('./gulp/config')

const commonPlugins = []

const developmentPlugins = [
  new WebpackNotifierPlugin({
    skipFirstNotification: true
  })
]

const productionPlugins = [
  new MinifyPlugin()
]

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource]?[loaders]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 0,
          test: /[\\/]node_modules[\\/]/,
          name: `${gulpConfig.paths.root === '/' ? '' : gulpConfig.paths.root}assets/scripts/vendor`,
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory'
          },
          {
            loader: 'standard-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      `${gulpConfig.paths.src}${gulpConfig.paths.root}/assets/scripts`
    ]
  },
  devtool: gulpConfig.env.DEVELOPMENT ? 'eval-source-map' : false,
  plugins: commonPlugins.concat(gulpConfig.env.DEVELOPMENT ? developmentPlugins : [], gulpConfig.env.PRODUCTION ? productionPlugins : []),
  watch: gulpConfig.watch
}
