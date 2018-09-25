const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const del = require('del')

const clean = () => {
  return del(config.outputDir, {
    dot: true
  })
}

gulp.task('clean', clean)
