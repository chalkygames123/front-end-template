const gulp = require('gulp')
const config = require('../config')
const $ = config.plugins

const images = () => {
  return $.eventStream.merge(
    gulp.src(config.images.src.globs, config.images.src.options)
      .pipe($.if(config.program.watch, $.plumber({
        errorHandler: $.notify.onError(error => {
          const options = {
            title: 'gulp images - Error',
            message: error.message.replace($.ansiRegex(), ''),
            wait: true
          }

          return options
        })
      })))
      .pipe($.changed(config.paths.dest))
      .pipe($.if(config.env.PRODUCTION, $.imagemin([
        $.imagemin.gifsicle(
          config.images.imagemin.gifsicle
        ),
        $.imagemin.jpegtran(
          config.images.imagemin.jpegtran
        ),
        $.imagemin.svgo(
          config.images.imagemin.svgo
        ),
        $.imageminPngquant(
          config.images.imageminPngquant
        )
      ]))),
    gulp.src(config.images.webpSrc.globs, config.images.webpSrc.options)
      .pipe($.if(config.program.watch, $.plumber({
        errorHandler: $.notify.onError(error => {
          const options = {
            title: 'gulp images - Error',
            message: error.message.replace($.ansiRegex(), ''),
            wait: true
          }

          return options
        })
      })))
      .pipe($.changed(config.paths.dest))
      .pipe($.imagemin([
        $.imageminWebp(
          config.images.imageminWebp
        )
      ]))
      .pipe($.rename({
        extname: '.webp'
      }))
  )
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.program.watch, config.myServer.stream()))
}

gulp.task('images', images)
