const path = require('path')

const Eleventy = require('@11ty/eleventy')
const browserSync = require('browser-sync')
const webpack = require('webpack')

const config = require('../config')
const webpackConfig = require('../webpack.config')

const eleventy = new Eleventy()

eleventy.init()

module.exports = {
  eleventy,
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
