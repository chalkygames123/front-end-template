import browserSync from 'browser-sync'

import config from '../../config'

export default function serve() {
  browserSync.create().init({
    ui: false,
    files: config.get('distDir'),
    server: config.get('distDir'),
    https: config.get('https') && {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    },
    online: false,
    startPath: config.get('site.basePath')
  })
}
