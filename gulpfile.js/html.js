const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

function html () {
  return gulp
    .src(config.srcPaths.html, {
      base: path.join(config.srcDir, config.dir.pages)
    })
    .pipe($.plumber({
      errorHandler: $.notify.onError()
    }))
    .pipe($.filter(`**/!(_)*.${config.ext.html}`))
    .pipe($.ejs(null, {
      root: path.join(config.srcDir, 'pages')
    }, {
      ext: '.html'
    }))
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe($.htmlhint.failOnError({
      suppress: true
    }))
    .pipe($.if(!isDev, $.htmlmin({
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
    .pipe(gulp.dest(path.join(config.distDir, config.baseDir)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(path.join(config.distDir, config.baseDir))))
    .pipe(config.server.stream())
}

module.exports = html
