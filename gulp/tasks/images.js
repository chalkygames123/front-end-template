const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

const images = () => {
  return gulp.src(config.images.src.globs, config.images.src.options)
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
      require('imagemin-pngquant')(
        config.images.imageminPngquant
      )
    ])))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.filter(config.images.webpFilter.pattern))
    .pipe($.if(config.env.PRODUCTION, $.imagemin([
      require('imagemin-webp')(
        config.images.imageminWebp
      )
    ])))
    .pipe($.rename({
      extname: '.webp'
    }))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.watch, config.server.stream()))
}

gulp.task('images', images)
