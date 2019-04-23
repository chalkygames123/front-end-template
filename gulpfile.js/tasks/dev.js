import gulp from 'gulp'

import build from './build'
import serve from './serve'
import watch from './watch'

export default gulp.series(build, gulp.parallel(serve, watch))
