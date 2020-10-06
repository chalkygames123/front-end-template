const path = require('path')

const gulp = require('gulp')
const gulpChanged = require('gulp-changed')
const gulpIf = require('gulp-if')

const config = require('../../config')
const common = require('../common')

const srcPaths = path.posix.join(config.get('srcDir'), 'static/**')
const isDev = config.get('mode') !== 'production'

function copy() {
  if (config.get('watch') && !gulp.lastRun(copy)) {
    gulp.watch(srcPaths, copy)
  }

  return gulp
    .src(srcPaths, {
      base: path.join(config.get('srcDir'), 'static'),
      nodir: true,
    })
    .pipe(
      gulpIf(
        isDev,
        gulpChanged(path.join(config.get('distDir'), config.get('publicPath')))
      )
    )
    .pipe(gulp.dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

module.exports = copy
