const path = require('path')

const $ = require('gulp-load-plugins')()
const gulp = require('gulp')
const upath = require('upath')

const config = require(path.resolve('config'))

const isDev = config.env === 'development'

function html () {
  return gulp
    .src(config.srcPaths.html, {
      base: upath.join(config.srcDir, config.dir.pages)
    })
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe($.filter(upath.join('**', `!(_)*.${config.ext.html}`)))
    .pipe($.ejs(null, {
      root: upath.join(config.srcDir, config.dir.pages)
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
    .pipe(gulp.dest(upath.join(config.distDir, config.baseDir)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(upath.join(config.distDir, config.baseDir))))
    .pipe(config.server.stream())
}

module.exports = html
