const gulp = require('gulp')
const config = require('../config')
const $ = config.plugins

const styles = () => {
  return gulp.src(config.styles.src.globs, config.styles.src.options)
    .pipe($.if(config.program.watch, $.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp styles - Error',
          message: error.message.replace($.ansiRegex(), ''),
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
    .pipe($.if(config.env.DEVELOPMENT, $.sourcemaps.init()))
    .pipe($.sassGlob())
    .pipe($.sass(config.styles.sass))
    .pipe($.postcss([
      $.autoprefixer(),
      $.cssMqpacker(config.styles.postcss.cssMqpacker),
      $.postcssAssets(config.styles.postcss.postcssAssets)
    ]))
    .pipe($.rename(path => {
      path.extname = '.css'
    }))
    .pipe($.if(config.env.DEVELOPMENT, $.sourcemaps.write('maps')))
    .pipe($.if(config.env.PRODUCTION, $.cleanCss(config.styles.cleanCss)))
    .pipe($.if(config.env.PRODUCTION, $.csso()))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.env.PRODUCTION, $.gzip()))
    .pipe($.if(config.env.PRODUCTION, gulp.dest(config.paths.dest)))
    .pipe($.if(config.program.watch, config.myServer.stream()))
}

gulp.task('styles', ['images'], styles)
