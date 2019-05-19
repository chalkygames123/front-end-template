import gulp from 'gulp'

import common from '../../common'
import copy from './copy'
import images from './images'
import scripts from './scripts'
import styles from './styles'
import templates from './templates'

export default function watch() {
  gulp.watch(common.srcPaths.copy, copy)
  gulp.watch(common.srcPaths.images, images)
  gulp.watch(common.srcPaths.includes, templates)
  gulp.watch(common.srcPaths.layouts, templates)
  gulp.watch(common.srcPaths.pages, templates)
  gulp.watch(common.srcPaths.scripts, scripts)
  gulp.watch(common.srcPaths.styles, styles)
}
