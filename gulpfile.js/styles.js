const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const nodeSassMagicImporter = require('node-sass-magic-importer')

const config = require(path.resolve('config'))
const images = require('./images')

const isDev = config.env === 'development'

function styles () {
  return gulp
    .src(config.srcPaths.styles, {
      base: config.srcDir
    })
    .pipe($.plumber({
      errorHandler: $.notify.onError()
    }))
    .pipe($.stylelint({
      reporters: [
        {
          failOnError: true,
          formatter: 'string',
          console: true
        }
      ]
    }))
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.sass({
      importer: nodeSassMagicImporter(),
      includePaths: path.join(config.srcDir, config.dir.assets, config.dir.styles),
      outputStyle: 'compressed'
    }))
    .pipe($.postcss())
    .pipe($.rename(path => {
      path.extname = '.css'
    }))
    .pipe($.if(isDev, $.sourcemaps.write({
      sourceRoot: '/src'
    })))
    .pipe($.if(!isDev, $.cleanCss({
      rebase: false
    })))
    .pipe($.if(!isDev, $.csso()))
    .pipe(gulp.dest(path.join(config.distDir, config.baseDir)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(path.join(config.distDir, config.baseDir))))
    .pipe(config.server.stream())
}

module.exports = gulp.series(images, styles)
