import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('env') === 'development'

export default function templates() {
  return gulp
    .src(config.get('srcPaths.pages'), {
      base: upath.join(config.get('srcDir'), config.get('dir.pages'))
    })
    .pipe(
      $.if(
        isDev,
        $.plumber({
          errorHandler: $.notify.onError()
        })
      )
    )
    .pipe($.filter(`**/!(-)*${config.get('ext.templates')}`))
    .pipe(
      $.data(file => ({
        page: {
          path: upath
            .join(
              '/',
              config.get('site.basePath'),
              upath.changeExt(file.relative, '.html')
            )
            .replace(/\/index\.html$/, '/'),
          dirname: upath.join(
            config.get('site.basePath'),
            upath.dirname(file.relative),
            '/'
          ),
          relative: upath.changeExt(file.relative, '.html')
        }
      }))
    )
    .pipe(
      $.nunjucksRender({
        path: config.get('srcDir'),
        manageEnv: env => {
          env.addGlobal('site', config.getProperties().site)
          env.addFilter('setprop', (object, key, value) => {
            const newObject = object
            newObject[key] = value
            return newObject
          })
          env.addFilter('trimext', path => {
            return upath.trimExt(path)
          })
        }
      })
    )
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter('htmlhint-stylish'))
    .pipe(
      $.htmlhint.failOnError({
        suppress: true
      })
    )
    .pipe(
      $.w3cjs({
        showInfo: true
      })
    )
    .pipe($.w3cjs.reporter())
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
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, $.gzip()))
    .pipe($.if(config.get('gzip') && !isDev, detectConflict()))
    .pipe(
      $.if(
        config.get('gzip') && !isDev,
        gulp.dest(
          upath.join(config.get('distDir'), config.get('site.basePath'))
        )
      )
    )
    .pipe(common.server.stream())
}
