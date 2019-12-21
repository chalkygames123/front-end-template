import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import config from '../../config'
import common from '../common'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

export default function templates() {
  return gulp
    .src(config.get('srcPaths.pages'), {
      base: upath.join(config.get('srcDir'), config.get('dir.pages'))
    })
    .pipe($.filter('**/!(-)*'))
    .pipe(
      $.data(file => ({
        site: config.getProperties().site,
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
          env.addFilter('setprop', (object, key, value) => {
            const newObject = object
            newObject[key] = value
            return newObject
          })
        }
      })
    )
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter('htmlhint-stylish'))
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
    .pipe($.if(config.get('gzip') && !isDev, common.gzipChannel()))
    .pipe($.if(isDev, common.server.stream()))
}
