const gulp = require('gulp')
const config = require('../config')
const $ = config.plugins

const html = () => {
  return gulp.src(config.html.src.globs, config.html.src.options)
    .pipe($.filter(config.html.filter.pattern))
    .pipe($.if(config.program.watch, $.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp html - Error',
          message: error.message.replace($.ansiRegex(), ''),
          wait: true
        }

        return options
      })
    })))
    .pipe($.ejs(
      config.html.ejs.data,
      config.html.ejs.options,
      config.html.ejs.settings
    ))
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe($.htmlhint.failOnError({
      suppress: true
    }))
    .pipe($.if(config.env.PRODUCTION, $.htmlmin(config.html.htmlmin)))
    .pipe(gulp.dest(config.paths.dest))
    .pipe($.if(config.env.PRODUCTION, $.gzip()))
    .pipe($.if(config.env.PRODUCTION, gulp.dest(config.paths.dest)))
    .pipe($.if(config.program.watch, config.myServer.stream()))
}

gulp.task('html', html)
