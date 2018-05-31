const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()
const webpackConfig = require('../../webpack.config')

const scripts = () => {
  return gulp.src(config.scripts.src.globs, config.scripts.src.options)
    .pipe(require('vinyl-named')(file => {
      return require('normalize-path')(file.relative.replace(/\.[^.]+$/, ''))
    }))
    .pipe(require('webpack-stream')(webpackConfig, require('webpack')))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.env.PRODUCTION, $.gzip()))
    .pipe($.if(config.env.PRODUCTION, gulp.dest(config.paths.dest)))
    .pipe($.if(config.watch, config.server.stream()))
}

gulp.task('scripts', scripts)
