const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

const styles = () => {
  return gulp.src(config.styles.src.globs, config.styles.src.options)
    .pipe($.if(config.watch, $.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp styles - Error',
          message: error.message.replace(require('ansi-regex')(), ''),
          wait: true
        }

        return options
      })
    })))
    .pipe($.stylelint({
      reporters: [
        {
          failAfterError: true,
          formatter: 'string',
          console: true
        }
      ]
    }))
    .pipe($.if(config.env.DEVELOPMENT, $.sourcemaps.init(config.styles.sourcemaps.init)))
    .pipe($.sass(config.styles.sass))
    .pipe($.postcss())
    .pipe($.rename(path => {
      path.extname = '.css'
    }))
    .pipe($.if(config.env.DEVELOPMENT, $.sourcemaps.write()))
    .pipe($.if(config.env.PRODUCTION, $.cleanCss(config.styles.cleanCss)))
    .pipe($.if(config.env.PRODUCTION, $.csso()))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.env.PRODUCTION, $.gzip()))
    .pipe($.if(config.env.PRODUCTION, gulp.dest(config.paths.dest)))
    .pipe($.if(config.watch, config.server.stream()))
}

gulp.task('styles', ['images'], styles)
