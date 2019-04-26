import browserSync from 'browser-sync'
import upath from 'upath'

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
      copy: [
        upath.join(config.get('srcDir'), this.dir.static, '**'),
        '!**/.gitkeep'
      ],
      images: upath.join(
        config.get('srcDir'),
        this.dir.assets,
        this.dir.images,
        '**',
        `*${this.ext.images}`
      ),
      includes: upath.join(
        config.get('srcDir'),
        this.dir.includes,
        '**',
        `*${this.ext.pages}`
      ),
      layouts: upath.join(
        config.get('srcDir'),
        this.dir.layouts,
        '**',
        `*${this.ext.pages}`
      ),
      pages: upath.join(
        config.get('srcDir'),
        this.dir.pages,
        '**',
        `*${this.ext.pages}`
      ),
      scripts: upath.join(
        config.get('srcDir'),
        this.dir.assets,
        this.dir.scripts,
        '**',
        `*${this.ext.scripts}`
      ),
      styles: upath.join(
        config.get('srcDir'),
        this.dir.assets,
        this.dir.styles,
        '**',
        `*${this.ext.styles}`
      )
    }
  }
}

export default common
