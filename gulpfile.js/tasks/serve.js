import common from '../../common'
import config from '../../config'

export default function serve() {
  common.server.init({
    ui: false,
    server: config.get('distDir'),
    https: config.get('https')
      ? {
          key: 'localhost-key.pem',
          cert: 'localhost.pem'
        }
      : false,
    startPath: config.get('site.basePath')
  })
}
