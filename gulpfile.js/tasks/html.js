import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import * as utils from '../utils'
import common from '../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = common.env === 'development'

export default function html() {
  return gulp
    .src(common.srcPaths.html, {
      base: `${config.srcDir}/${common.dir.pages}`
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe($.filter(`**/!(_)*${common.ext.html}`))
    .pipe(
      $.ejs(
        null,
        {
          root: `${config.srcDir}/${common.dir.pages}`
        },
        {
          ext: '.html'
        }
      )
    )
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe(
      $.htmlhint.failOnError({
        suppress: true
      })
    )
    .pipe(
      $.if(
        !isDev,
        $.htmlmin({
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
        })
      )
    )
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.distDir}/${config.basePath}`))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.gzip && !isDev,
        gulp.dest(`${config.distDir}/${config.basePath}`)
      )
    )
    .pipe(common.server.stream())
}
