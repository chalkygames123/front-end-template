import gulp from 'gulp'

import common from '../../common'
import copy from './copy'
import images from './images'
import pages from './pages'
import scripts from './scripts'
import styles from './styles'

export default function watch() {
  gulp.watch(common.srcPaths.copy, copy)
  gulp.watch(common.srcPaths.images, images)
  gulp.watch(common.srcPaths.includes, pages)
  gulp.watch(common.srcPaths.pages, pages)
  gulp.watch(common.srcPaths.scripts, scripts)
  gulp.watch(common.srcPaths.styles, styles)
}
