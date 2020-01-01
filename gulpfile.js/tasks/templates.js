const path = require('path')

const gulp = require('gulp')
const gulpData = require('gulp-data')
const gulpFilter = require('gulp-filter')
const gulpGzip = require('gulp-gzip')
const gulpHtmlhint = require('gulp-htmlhint')
const gulpHtmlmin = require('gulp-htmlmin')
const gulpIf = require('gulp-if')
const gulpNunjucksRender = require('gulp-nunjucks-render')

const config = require('../../config')
const common = require('../common')
const detectConflict = require('../utils/detectConflict')

const isDev = config.get('mode') !== 'production'

module.exports = function templates() {
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
    .pipe(gulpIf(isDev, common.server.stream()))
    .pipe(gulpIf(config.get('gzip') && !isDev, gulpGzip()))
    .pipe(gulpIf(config.get('gzip') && !isDev, detectConflict()))
    .pipe(
      gulpIf(
        config.get('gzip') && !isDev,
        gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
      )
    )
}
