const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const vinylNamed = require('vinyl-named')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')

const config = require(path.resolve('config'))
const webpackConfig = require(path.resolve('webpack.config'))

const isDev = config.env === 'development'

function scripts () {
  return gulp
    .src(config.srcPaths.scripts, {
      base: config.srcDir
    })
    .pipe($.plumber({
      errorHandler: () => false
    }))
    .pipe($.filter(`**/!(_)*.${config.ext.scripts}`))
    .pipe(vinylNamed(file => {
      return file.relative.replace(/\.[^.]+$/, '')
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.join(config.distDir, config.baseDir)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(path.join(config.distDir, config.baseDir))))
    .pipe(config.server.stream())
}

module.exports = scripts
