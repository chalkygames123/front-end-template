import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

export default function copy() {
  return gulp
    .src(common.srcPaths.copy, {
      base: `${config.get('srcDir')}/${common.dir.static}`,
      dot: true,
      nodir: true
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe($.changed(`${config.get('distDir')}/${config.get('basePath')}`))
    .pipe(gulp.dest(`${config.get('distDir')}/${config.get('basePath')}`))
    .pipe(common.server.stream())
}
