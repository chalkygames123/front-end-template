const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const imageminPngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

function images () {
  return gulp
    .src(config.srcPaths.images, {
      base: config.srcDir
    })
    .pipe($.changed(`${config.distDir}/${config.baseDir}`))
    .pipe($.if(!isDev, $.imagemin([
      $.imagemin.gifsicle({
        optimizationLevel: 3
      }),
      $.imagemin.jpegtran({
        progressive: true
      }),
      $.imagemin.svgo(),
      imageminPngquant({
        quality: '80-90',
        speed: 1
      })
    ])))
    .pipe(gulp.dest(`${config.distDir}/${config.baseDir}`))
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
    .pipe($.if(config.webp, gulp.dest(`${config.distDir}/${config.baseDir}`)))
    .pipe(config.server.stream())
}

module.exports = images
