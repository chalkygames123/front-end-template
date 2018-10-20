const path = require('path')

const gulp = require('gulp')
const upath = require('upath')

const config = require(path.resolve('config'))

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: upath.join(config.srcDir, config.dir.static),
      since: gulp.lastRun(copy),
      dot: true,
      nodir: true
    })
    .pipe(gulp.dest(upath.join(config.distDir, config.baseDir)))
    .pipe(config.server.stream())
}

module.exports = copy
