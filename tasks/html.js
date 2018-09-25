const gulp = require('gulp')
const config = require(require('path').resolve('config'))
const $ = require('gulp-load-plugins')()
const ansiRegex = require('ansi-regex')

const src = `${config.srcDir}/pages/**/*.ejs`

module.exports = { src }

const html = () => {
  return gulp
    .src(src, {
      base: `${config.srcDir}/pages`
    })
    .pipe($.plumber({
      errorHandler: $.notify.onError(error => {
        const options = {
          title: 'gulp html - Error',
          message: error.message.replace(ansiRegex(), ''),
          wait: true
        }

        return options
      })
    }))
    .pipe($.filter('**/!(_)*.ejs'))
    .pipe($.ejs(null, {
      root: `${config.srcDir}/pages`
    }, {
      ext: '.html'
    }))
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe($.htmlhint.failOnError({
      suppress: true
    }))
    .pipe($.if(!config.isDev, $.htmlmin({
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest(`${config.outputDir}${config.baseUrl}`))
    .pipe($.if(!config.isDev, $.gzip()))
    .pipe($.if(!config.isDev, gulp.dest(`${config.outputDir}${config.baseUrl}`)))
    .pipe(config.server.stream())
}

gulp.task('html', html)
