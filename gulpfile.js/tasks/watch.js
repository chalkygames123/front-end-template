import gulp from 'gulp'

import common from '../common'
import copy from './copy'
import html from './html'
import images from './images'
import scripts from './scripts'
import styles from './styles'

export default function watch() {
  gulp.watch(common.srcPaths.copy, copy)
  gulp.watch(common.srcPaths.html, html)
  gulp.watch(common.srcPaths.images, images)
  gulp.watch(common.srcPaths.scripts, scripts)
  gulp.watch(common.srcPaths.styles, styles)
}
