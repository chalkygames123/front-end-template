import gulp from 'gulp'

import clean from './clean'
import copy from './copy'
import images from './images'
import pages from './pages'
import scripts from './scripts'
import styles from './styles'

export default gulp.series(
  clean,
  gulp.parallel(copy, images, pages, scripts, styles)
)
