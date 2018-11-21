const browserSync = require('browser-sync')
const upath = require('upath')

const config = require('../config')

const common = {
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
    upath.join(config.srcDir, config.dir.static, '**'),
    '!**/.gitkeep'
  ],
  html: upath.join(config.srcDir, config.dir.pages, '**', `*${common.ext.html}`),
  images: upath.join(config.srcDir, config.dir.assets, config.dir.images, '**', `*${common.ext.images}`),
  scripts: upath.join(config.srcDir, config.dir.assets, config.dir.scripts, '**', `*${common.ext.scripts}`),
  styles: upath.join(config.srcDir, config.dir.assets, config.dir.styles, '**', `*${common.ext.styles}`)
}

module.exports = common
