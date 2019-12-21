import path from 'path'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import config from '../../config'
import common from '../common'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

export default function copy() {
  return gulp
    .src(config.get('srcPaths.copy'), {
      base: path.join(config.get('srcDir'), config.get('dir.static')),
      dot: true,
      nodir: true
    })
    .pipe(
      $.if(
        isDev,
        $.changed(path.join(config.get('distDir'), config.get('site.basePath')))
      )
    )
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(isDev, common.server.stream()))
}
