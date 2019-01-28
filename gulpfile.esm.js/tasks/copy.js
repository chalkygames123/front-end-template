import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development'

export default function copy() {
  return gulp
    .src(common.srcPaths.copy, {
      base: `${config.srcDir}/${common.dir.static}`,
      dot: true,
      nodir: true
    })
    .pipe($.changed(`${config.distDir}/${config.baseDir}`))
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe(common.server.stream())
}
