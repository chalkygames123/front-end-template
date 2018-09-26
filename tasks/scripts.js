const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const vinylNamed = require('vinyl-named')
const normalizePath = require('normalize-path')
const webpackStream = require('webpack-stream')
const webpackConfig = require(require('path').resolve('webpack.config'))
const webpack = require('webpack')
const server = require('./serve').server

const src = `${config.srcDir}/${config.assetsDir}/scripts/**/*.js`

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
      return normalizePath(file.relative.replace(/\.[^.]+$/, ''))
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(`${config.outputDir}${config.baseUrl}`))
    .pipe($.if(!config.isDev, $.gzip()))
    .pipe($.if(!config.isDev, gulp.dest(`${config.outputDir}${config.baseUrl}`)))
    .pipe(server.stream())
}

gulp.task('scripts', scripts)
