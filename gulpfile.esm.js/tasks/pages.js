import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import * as utils from '../utils'
import common from '../../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV === 'development'

export default function pages() {
  return gulp
    .src(common.srcPaths.pages, {
      base: `${config.get('srcDir')}/${common.dir.pages}`
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe(
      $.ejs(
        null,
        {
          root: `${config.get('srcDir')}/${common.dir.includes}`
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
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        })
      )
    )
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(`${config.get('distDir')}/${config.get('baseDir')}`))
    .pipe($.if(config.get('gzip') && !isDev, $.gzip()))
    .pipe($.if(config.get('gzip') && !isDev, utils.detectConflict()))
    .pipe(
      $.if(
        config.get('gzip') && !isDev,
        gulp.dest(`${config.get('distDir')}/${config.get('baseDir')}`)
      )
    )
    .pipe(common.server.stream())
}
