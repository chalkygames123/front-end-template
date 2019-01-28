import build from './tasks/build'
import clean from './tasks/clean'
import copy from './tasks/copy'
import dev from './tasks/dev'
import images from './tasks/images'
import pages from './tasks/pages'
import scripts from './tasks/scripts'
import serve from './tasks/serve'
import styles from './tasks/styles'
import watch from './tasks/watch'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

export default serve
export { build, clean, copy, dev, images, pages, scripts, serve, styles, watch }
