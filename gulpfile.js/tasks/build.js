import gulp from 'gulp'

import clean from './clean'
import copy from './copy'
import html from './html'
import scripts from './scripts'
import styles from './styles'

export default gulp.series(
  clean,
  gulp.parallel(copy, html, scripts, styles)
)
