const isDev = process.env.NODE_ENV === 'development'

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
