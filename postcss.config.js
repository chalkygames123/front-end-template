import autoprefixer from 'autoprefixer'
import cssMqpacker from 'css-mqpacker'
import postcssNormalize from 'postcss-normalize'

export default {
  plugins: [
    postcssNormalize(),
    autoprefixer({
      grid: 'autoplace'
    }),
    cssMqpacker({
      sort: true
    })
  ]
}
