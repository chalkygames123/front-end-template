const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const upath = require('upath')
const vinylNamed = require('vinyl-named')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')

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
    .pipe($.filter(upath.join('**', `!(_)*.${config.ext.scripts}`)))
    .pipe(vinylNamed(file => {
      file.base = config.srcDir
      return upath.normalize(upath.trimExt(file.relative))
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(upath.join(config.distDir, config.baseDir)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(upath.join(config.distDir, config.baseDir))))
    .pipe(config.server.stream())
}

module.exports = scripts
