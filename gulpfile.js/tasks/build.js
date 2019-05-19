import gulp from 'gulp'

import clean from './clean'
import copy from './copy'
import images from './images'
import scripts from './scripts'
import styles from './styles'
import templates from './templates'

export default gulp.series(
  clean,
  gulp.parallel(copy, images, scripts, styles, templates)
)
