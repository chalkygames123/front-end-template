const path = require('path')

const browserSync = require('browser-sync')
const webpack = require('webpack')

const config = require('../config')
const webpackConfig = require('../webpack.config')

const common = {
  server: browserSync.create(),
  srcPaths: {
    copy: [
      path.posix.join(config.get('srcDir'), config.get('dir.static'), '**'),
      '!**/.gitkeep'
    ],
    images: path.posix.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.images'),
      '**',
      `*${config.get('ext.images')}`
    ),
    includes: path.posix.join(
      config.get('srcDir'),
      config.get('dir.includes'),
      '**',
      `*${config.get('ext.templates')}`
    ),
    layouts: path.posix.join(
      config.get('srcDir'),
      config.get('dir.layouts'),
      '**',
      `*${config.get('ext.templates')}`
    ),
    pages: path.posix.join(
      config.get('srcDir'),
      config.get('dir.pages'),
      '**',
      `*${config.get('ext.templates')}`
    ),
    sprites: path.posix.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.images'),
      config.get('dir.sprites'),
      '**',
      `*${config.get('ext.sprites')}`
    ),
    styles: path.posix.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.styles'),
      '**',
      `*${config.get('ext.styles')}`
    )
  },
  webpackCompiler: webpack(webpackConfig)
}

module.exports = common
