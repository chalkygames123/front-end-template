import browserSync from 'browser-sync'

import config from './config'

const common = {
  dir: {
    assets: 'assets',
    images: 'images',
    includes: 'includes',
    layouts: 'layouts',
    pages: 'pages',
    scripts: 'scripts',
    sprites: 'sprites',
    static: 'static',
    styles: 'styles'
  },
  ext: {
    images: '.+(png|jp?(e)g|gif|svg)',
    pages: '.njk',
    scripts: '.js',
    sprites: '.svg',
    styles: '.scss'
  },
  server: browserSync.create()
}

common.srcPaths = {
  copy: [`${config.get('srcDir')}/${common.dir.static}/**`, '!**/.gitkeep'],
  images: `${config.get('srcDir')}/${common.dir.assets}/${
    common.dir.images
  }/**/*${common.ext.images}`,
  includes: `${config.get('srcDir')}/${common.dir.includes}/**/*${
    common.ext.pages
  }`,
  layouts: `${config.get('srcDir')}/${common.dir.layouts}/**/*${
    common.ext.pages
  }`,
  pages: `${config.get('srcDir')}/${common.dir.pages}/**/*${common.ext.pages}`,
  scripts: `${config.get('srcDir')}/${common.dir.assets}/${
    common.dir.scripts
  }/**/*${common.ext.scripts}`,
  styles: `${config.get('srcDir')}/${common.dir.assets}/${
    common.dir.styles
  }/**/*${common.ext.styles}`
}

export default common
