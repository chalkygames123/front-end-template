import autoprefixer from 'autoprefixer'
import postcssNormalize from 'postcss-normalize'

export default {
  plugins: [
    postcssNormalize(),
    autoprefixer({
      grid: 'autoplace'
    })
  ]
}
