import path from 'path'

import gulp from 'gulp'
import gulpData from 'gulp-data'
import gulpFilter from 'gulp-filter'
import gulpHtmlhint from 'gulp-htmlhint'
import gulpHtmlmin from 'gulp-htmlmin'
import gulpIf from 'gulp-if'
import gulpNunjucksRender from 'gulp-nunjucks-render'

import config from '../../config'
import common from '../common'
import detectConflict from '../utils/detectConflict'

const isDev = config.get('mode') !== 'production'
export default function templates() {
  return gulp
    .src(config.get('srcPaths.pages'), {
      base: path.join(config.get('srcDir'), config.get('dir.pages'))
    })
    .pipe(gulpFilter('**/!(-)*'))
    .pipe(
      gulpData(file => ({
        site: config.getProperties().site,
        page: {
          path: path
            .join(
              '/',
              config.get('site.basePath'),
              file.relative.replace(/\.[^.]+$/, '.html')
            )
            .replace(/\/index\.html$/, '/'),
          dirname: path.join(
            config.get('site.basePath'),
            path.dirname(file.relative),
            '/'
          ),
          relative: file.relative.replace(/\.[^.]+$/, '.html')
        }
      }))
    )
    .pipe(
      gulpNunjucksRender({
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
    .pipe(gulpHtmlhint('.htmlhintrc'))
    .pipe(gulpHtmlhint.reporter('htmlhint-stylish'))
    .pipe(
      gulpIf(
        !isDev,
        gulpHtmlmin({
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
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe(gulpIf(config.get('gzip') && !isDev, common.gzipChannel()))
}
