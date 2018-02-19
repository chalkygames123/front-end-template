const webpack = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const PRODUCTION = process.env.NODE_ENV === 'production'
const WATCH = process.env.NODE_ENV === 'watch'

const commonPlugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'assets/scripts/vendor',
    minChunks: module => /node_modules/.test(module.context)
  })
]

const developmentPlugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: 'maps/[name].js.map',
    exclude: ['assets/scripts/vendor']
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
      'src/assets/scripts'
    ]
  },
  plugins: commonPlugins.concat(PRODUCTION ? productionPlugins : developmentPlugins),
  watch: WATCH
}
