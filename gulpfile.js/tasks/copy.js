const path = require('path')

const gulp = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpIf = require('gulp-if')

const config = require('../../config')
const common = require('../common')

const isDev = config.get('mode') !== 'production'

module.exports = function copy() {
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
