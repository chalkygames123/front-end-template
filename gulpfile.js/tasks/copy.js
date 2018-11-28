import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import common from '../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = common.env === 'development'

export default function copy () {
  return gulp
    .src(common.srcPaths.copy, {
      base: upath.join(config.srcDir, config.dir.static),
      dot: true,
      nodir: true
    })
    .pipe($.changed(upath.join(config.distDir, config.basePath)))
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe(gulp.dest(upath.join(config.distDir, config.basePath)))
    .pipe(common.server.stream())
}
