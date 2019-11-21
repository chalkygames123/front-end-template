import browserSync from 'browser-sync'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import lazypipe from 'lazypipe'
import upath from 'upath'

import config from '../config'
import detectConflict from './utils/detectConflict'

const $ = gulpLoadPlugins()

const common = {
  server: browserSync.create(),
  gzipChannel: lazypipe()
    .pipe($.gzip)
    .pipe(detectConflict)
    .pipe(() =>
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
}

export default common
