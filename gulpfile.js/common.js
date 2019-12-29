import path from 'path'

import gulp from 'gulp'
import gulpGzip from 'gulp-gzip'
import lazypipe from 'lazypipe'
import webpack from 'webpack'

import config from '../config'
import webpackConfig from '../webpack.config'

import detectConflict from './utils/detectConflict'

const common = {
  gzipChannel: lazypipe()
    .pipe(gulpGzip)
    .pipe(detectConflict)
    .pipe(() =>
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    ),
  webpackCompiler: webpack(webpackConfig)
}

export default common
