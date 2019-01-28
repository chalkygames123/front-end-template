import common from '../../common'
import config from '../../config'

export default function serve(cb) {
  common.server.init({
    ui: false,
    server: config.distDir,
    startPath: config.baseDir
  })

  cb()
}
