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
  server: browserSync.create(),
  get srcPaths() {
    return {
      copy: [`${config.get('srcDir')}/${this.dir.static}/**`, '!**/.gitkeep'],
      images: `${config.get('srcDir')}/${this.dir.assets}/${
        this.dir.images
      }/**/*${this.ext.images}`,
      includes: `${config.get('srcDir')}/${this.dir.includes}/**/*${
        this.ext.pages
      }`,
      layouts: `${config.get('srcDir')}/${this.dir.layouts}/**/*${
        this.ext.pages
      }`,
      pages: `${config.get('srcDir')}/${this.dir.pages}/**/*${this.ext.pages}`,
      scripts: `${config.get('srcDir')}/${this.dir.assets}/${
        this.dir.scripts
      }/**/*${this.ext.scripts}`,
      styles: `${config.get('srcDir')}/${this.dir.assets}/${
        this.dir.styles
      }/**/*${this.ext.styles}`
    }
  }
}

export default common
