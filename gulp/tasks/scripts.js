const gulp = require('gulp')
const config = require('../config')
const $ = config.plugins
const webpackConfig = require('../../webpack.config')

const scripts = () => {
  return gulp.src(config.scripts.src.globs, config.scripts.src.options)
    .pipe($.vinylNamed(file => {
      return file.relative.replace(/\.[^.]+$/, '')
    }))
    .pipe($.webpackStream(webpackConfig, $.webpack))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(!config.env.development, $.gzip()))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.program.watch, config.myServer.stream()))
}

gulp.task('scripts', scripts)
