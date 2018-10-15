const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')

const config = require(path.resolve('config'))

function copy () {
  return gulp
    .src(config.srcPaths.copy, {
      base: `${config.srcDir}/${config.dir.static}`,
      dot: true,
      nodir: true
    })
    .pipe($.changed(`${config.distDir}/${config.baseDir}`))
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
    .pipe(config.server.stream())
}

module.exports = copy
