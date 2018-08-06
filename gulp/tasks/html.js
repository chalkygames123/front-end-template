const gulp = require('gulp')
const config = require('../config')
const $ = require('gulp-load-plugins')()

const html = () => {
  return gulp.src(config.html.src.globs, config.html.src.options)
    .pipe($.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp html - Error',
          message: error.message.replace(require('ansi-regex')(), ''),
          wait: true
        }

        return options
      })
    }))
    .pipe($.filter(config.html.filter.pattern))
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
    .pipe(config.server.stream())
}

gulp.task('html', html)
