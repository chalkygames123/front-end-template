const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const upath = require('upath')

const common = require(path.resolve('gulpfile.js/common'))
const config = require(path.resolve('config'))

const isDev = common.env === 'development'

function copy () {
  return gulp
    .src(common.srcPaths.copy, {
      base: upath.join(config.srcDir, config.dir.static),
      since: gulp.lastRun(copy),
      dot: true,
      nodir: true
    })
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe(gulp.dest(upath.join(config.distDir, config.basePath)))
    .pipe(common.server.stream())
}

module.exports = copy
