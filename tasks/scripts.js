const path = require('path')

const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const vinylNamed = require('vinyl-named')
const webpackStream = require('webpack-stream')
const webpackConfig = require(require('path').resolve('webpack.config'))
const webpack = require('webpack')
const server = require('./serve').server

const src = path.join(config.srcDir, config.assetsDir, 'scripts/**/*.js')

module.exports = { src }

const scripts = () => {
  return gulp
    .src(src, {
      base: config.srcDir
    })
    .pipe($.plumber({
      errorHandler: () => false
    }))
    .pipe($.filter('**/!(_)*.js'))
    .pipe(vinylNamed(file => {
      return file.relative.replace(/\.[^.]+$/, '')
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.join(config.outputDir, config.baseUrl)))
    .pipe($.if(!config.isDev, $.gzip()))
    .pipe($.if(!config.isDev, gulp.dest(path.join(config.outputDir, config.baseUrl))))
    .pipe(server.stream())
}

gulp.task('scripts', scripts)
