import del from 'del'

import config from '../../config'

export default function clean() {
  return del(config.get('distDir'), {
    dot: true
  })
}
