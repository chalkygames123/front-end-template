import autoprefixer from 'autoprefixer'
import cssMqpacker from 'css-mqpacker'

export default {
  plugins: [
    autoprefixer({
      grid: 'autoplace'
    }),
    cssMqpacker({
      sort: true
    })
  ]
}
