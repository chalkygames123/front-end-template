import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import config from '../../config'
import common from '../common'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

export default function copy() {
  return gulp
    .src(config.get('srcPaths.copy'), {
      base: upath.join(config.get('srcDir'), config.get('dir.static')),
      dot: true,
      nodir: true
    })
    .pipe(
      $.if(
        isDev,
        $.changed(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(isDev, common.server.stream()))
}
