const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const imageminPngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')
const upath = require('upath')

const common = require(path.resolve('gulpfile.js/common'))
const config = require(path.resolve('config'))
const utils = require('./utils')

const isDev = common.env === 'development'

function images () {
  return gulp
    .src(common.srcPaths.images, {
      base: config.srcDir
    })
    .pipe($.changed(upath.join(config.distDir, config.basePath)))
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe($.if(!isDev, $.imagemin([
      $.imagemin.gifsicle({
        optimizationLevel: 3
      }),
      $.imagemin.jpegtran({
        progressive: true
      }),
      $.imagemin.svgo({
        plugins: [{
          removeUselessDefs: false
        }, {
          removeViewBox: false
        }, {
          cleanupIDs: false
        }]
      }),
      imageminPngquant({
        quality: '80-90',
        speed: 1
      })
    ])))
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(upath.join(config.distDir, config.basePath)))
    .pipe($.if(config.webp, $.filter('**/*.+(png|jp?(e)g)')))
    .pipe($.if(config.webp && !isDev, $.imagemin([
      imageminWebp({
        quality: '90',
        method: 6
      })
    ])))
    .pipe($.if(config.webp, $.rename({
      extname: '.webp'
    })))
    .pipe($.if(config.webp, utils.detectConflict()))
    .pipe($.if(config.webp, gulp.dest(upath.join(config.distDir, config.basePath))))
    .pipe(common.server.stream())
}

module.exports = images
