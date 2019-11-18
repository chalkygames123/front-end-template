import stream from 'stream'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

export default function templates(cb) {
  stream.pipeline(
    ...[
      gulp.src(config.get('srcPaths.pages'), {
        base: upath.join(config.get('srcDir'), config.get('dir.pages'))
      }),
      $.filter(`**/!(-)*${config.get('ext.templates')}`),
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
      })),
      $.nunjucksRender({
        path: config.get('srcDir'),
        manageEnv: env => {
          env.addFilter('setprop', (object, key, value) => {
            const newObject = object
            newObject[key] = value
            return newObject
          })
          env.addFilter('trimext', path => {
            return upath.trimExt(path)
          })
        }
      }),
      $.htmlhint('.htmlhintrc'),
      $.htmlhint.reporter('htmlhint-stylish'),
      $.w3cjs({
        showInfo: true
      }),
      !isDev && $.w3cjs.reporter(),
      !isDev &&
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
        }),
      detectConflict(),
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath'))),
      ...(config.get('gzip') && !isDev
        ? [
            $.gzip(),
            detectConflict(),
            gulp.dest(
              upath.join(config.get('distDir'), config.get('site.basePath'))
            )
          ]
        : []
      ).filter(Boolean),
      isDev && common.server.stream()
    ].filter(Boolean),
    cb
  )
}
