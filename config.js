const browserSync = require('browser-sync')

const config = {
  srcDir: 'src',
  distDir: 'dist',
  baseDir: '/',
  gzip: true,
  webp: false,
  dir: {
    assets: 'assets',
    images: 'images',
    pages: 'pages',
    scripts: 'scripts',
    static: 'static',
    styles: 'styles'
  },
  ext: {
    html: 'ejs',
    images: '+(png|jp?(e)g|gif|svg)',
    scripts: 'js',
    styles: 'scss'
  },
  server: browserSync.create(),
  env: process.env.NODE_ENV || 'production'
}

config.srcPaths = {
  copy: [
    `${config.srcDir}/${config.dir.static}/**`,
    '!**/.gitkeep'
  ],
  html: `${config.srcDir}/${config.dir.pages}/**/*.${config.ext.html}`,
  images: `${config.srcDir}/${config.dir.assets}/${config.dir.images}/**/*.${config.ext.images}`,
  scripts: `${config.srcDir}/${config.dir.assets}/${config.dir.scripts}/**/*.${config.ext.scripts}`,
  styles: `${config.srcDir}/${config.dir.assets}/${config.dir.styles}/**/*.${config.ext.styles}`
}

module.exports = config
