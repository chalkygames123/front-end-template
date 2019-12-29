import path from 'path'

import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpIf from 'gulp-if'

import config from '../../config'
import common from '../common'

const isDev = config.get('mode') !== 'production'

export default function copy() {
  return gulp
    .src(config.get('srcPaths.copy'), {
      base: path.join(config.get('srcDir'), config.get('dir.static')),
      dot: true,
      nodir: true
    })
    .pipe(
      gulpIf(
        isDev,
        gulpChanged(
          path.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(gulpIf(isDev, common.server.stream()))
}
