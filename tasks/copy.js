const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const server = require('./serve').server

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
    .pipe(server.stream())
}

gulp.task('copy', copy)
