import { common } from '../../common'
import { config } from '../../config'

export function serve(cb) {
  common.server.init({
    ui: false,
    server: config.get('distDir'),
    startPath: config.get('site.basePath')
  })

  cb()
}
