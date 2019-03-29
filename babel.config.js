const isDev = process.env.NODE_ENV === 'development'

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
