const path = require('path')

const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const server = require('./serve').server

const src = [
  path.join(config.srcDir, 'static/**'),
  '!**/.gitkeep'
]

module.exports = { src }

const copy = () => {
  return gulp
    .src(src, {
      base: path.join(config.srcDir, 'static'),
      dot: true,
      nodir: true
    })
    .pipe($.changed(path.join(config.outputDir, config.baseUrl)))
    .pipe(gulp.dest(path.join(config.outputDir, config.baseUrl)))
    .pipe(server.stream())
}

gulp.task('copy', copy)
