import path from 'path'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import lazypipe from 'lazypipe'

import config from '../config'

import detectConflict from './utils/detectConflict'

const $ = gulpLoadPlugins()

const common = {
  gzipChannel: lazypipe()
    .pipe($.gzip)
    .pipe(detectConflict)
    .pipe(() =>
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
}

export default common
