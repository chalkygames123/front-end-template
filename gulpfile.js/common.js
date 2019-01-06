import browserSync from 'browser-sync'

import config from '../config'

const common = {
  dir: {
    assets: 'assets',
    images: 'images',
    pages: 'pages',
    scripts: 'scripts',
    static: 'static',
    styles: 'styles'
  },
  ext: {
    html: '.ejs',
    images: '.+(png|jp?(e)g|gif|svg)',
    scripts: '.js',
    styles: '.scss'
  },
  env: process.env.NODE_ENV || 'production',
  server: browserSync.create()
}

common.srcPaths = {
  copy: [
    `${config.srcDir}/${common.dir.static}/**`,
    '!**/.gitkeep'
  ],
  html: `${config.srcDir}/${common.dir.pages}/**/*${common.ext.html}`,
  images: `${config.srcDir}/${common.dir.assets}/${common.dir.images}/**/*${common.ext.images}`,
  scripts: `${config.srcDir}/${common.dir.assets}/${common.dir.scripts}/**/*${common.ext.scripts}`,
  styles: `${config.srcDir}/${common.dir.assets}/${common.dir.styles}/**/*${common.ext.styles}`
}

export default common
