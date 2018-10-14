const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const config = require(path.resolve('config'))

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: path.join(config.srcDir, config.dir.static),
      dot: true,
      nodir: true
    })
    .pipe($.changed(path.join(config.distDir, config.baseDir)))
    .pipe(gulp.dest(path.join(config.distDir, config.baseDir)))
    .pipe(config.server.stream())
}

module.exports = copy
