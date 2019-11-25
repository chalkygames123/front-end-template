import gulp from 'gulp'

import config from '../../config'

import copy from './copy'
import images from './images'
import scripts from './scripts'
import sprites from './sprites'
import styles from './styles'
import templates from './templates'

export default function watch() {
  gulp.watch(config.get('srcPaths.copy'), copy)
  gulp.watch(config.get('srcPaths.images'), images)
  gulp.watch(config.get('srcPaths.includes'), templates)
  gulp.watch(config.get('srcPaths.layouts'), templates)
  gulp.watch(config.get('srcPaths.pages'), templates)
  gulp.watch(config.get('srcPaths.scripts'), scripts)
  gulp.watch(config.get('srcPaths.sprites'), sprites)
  gulp.watch(config.get('srcPaths.styles'), styles)
}
