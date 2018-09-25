const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()

const src = [
  `${config.srcDir}/static/**`,
  '!**/.gitkeep'
]

module.exports = { src }

const copy = () => {
  return gulp
    .src(src, {
      base: `${config.srcDir}/static`,
      dot: true,
      nodir: true
    })
    .pipe($.changed(`${config.outputDir}${config.baseUrl}`))
    .pipe(gulp.dest(`${config.outputDir}${config.baseUrl}`))
    .pipe(config.server.stream())
}

gulp.task('copy', copy)
