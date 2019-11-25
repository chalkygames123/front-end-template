import config from '../../config'
import common from '../common'

export default function serve() {
  common.server.init({
    ui: false,
    server: config.get('distDir'),
    https: config.get('https') && {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    },
    online: false,
    startPath: config.get('site.basePath')
  })
}
