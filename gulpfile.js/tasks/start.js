import gulp from 'gulp'

import config from '../../config'

import build from './build'
import serve from './serve'
import watch from './watch'

const isDev = config.get('mode') !== 'production'

export default gulp.series(build, isDev ? gulp.parallel(serve, watch) : serve)
