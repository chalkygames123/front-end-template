import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

export default function copy() {
  return gulp
    .src(common.srcPaths.copy, {
      base: upath.join(config.get('srcDir'), common.dir.static),
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
    .pipe(
      $.changed(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(common.server.stream())
}
