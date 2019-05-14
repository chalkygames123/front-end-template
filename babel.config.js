import { config } from './config'

const isDev = config.get('env') === 'development'

export default api => {
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
    ],
    plugins: [!isDev && 'lodash'].filter(Boolean)
  }
}
