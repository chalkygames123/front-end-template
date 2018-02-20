const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const config = require('./gulp/config')

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const PRODUCTION = process.env.NODE_ENV === 'production'

const commonPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: config.paths.root + '/assets/scripts/vendor',
    minChunks: module => /node_modules/.test(module.context)
  })
]

const developmentPlugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: 'maps/[name].js.map',
    exclude: [config.paths.root + '/assets/scripts/vendor']
  }),
  new WebpackBuildNotifierPlugin({
    suppressSuccess: 'always',
    messageFormatter: (error, filepath) => {
      if (error) {}
      return require('path').relative(__dirname, filepath)
    }
  })
]

const productionPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
]

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'standard-loader'
          }
        ],
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      config.paths.src + config.paths.root + '/assets/scripts'
    ]
  },
  plugins: commonPlugins.concat(PRODUCTION ? productionPlugins : developmentPlugins),
  watch: DEVELOPMENT
}
