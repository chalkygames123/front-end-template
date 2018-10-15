const path = require('path')

const gulp = require('gulp')

const config = require(path.resolve('config'))

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: `${config.srcDir}/${config.dir.static}`,
      since: gulp.lastRun(copy),
      dot: true,
      nodir: true
    })
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe(config.server.stream())
}

module.exports = copy
