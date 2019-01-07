import common from './gulpfile.js/common'

const isDev = common.env === 'development'

export default api => {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage'
        }
      ]
    ],
    plugins: [!isDev && 'lodash'].filter(Boolean)
  }
}
