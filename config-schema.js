/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const convict = require('convict')

const schema = {
  mode: {
    doc: 'The mode of the build.',
    format: ['production', 'development'],
    default: 'production',
    arg: 'mode'
  },
  watch: {
    doc: 'Whether to enable watch mode.',
    format: Boolean,
    default: false,
    arg: 'watch'
  },
  srcDir: {
    doc: 'The source directory.',
    format: String,
    default: '.',
    arg: 'src-dir'
  },
  distDir: {
    doc: 'The dist directory.',
    format: String,
    default: 'dist',
    arg: 'dist-dir'
  },
  publicPath: {
    doc: 'The base path of the site.',
    format: String,
    default: '/'
  },
  dir: {
    assets: {
      doc: 'The assets directory.',
      format: String,
      default: 'assets'
    },
    images: {
      doc: 'The images directory.',
      format: String,
      default: 'images'
    },
    scripts: {
      doc: 'The scripts directory.',
      format: String,
      default: 'scripts'
    },
    sprites: {
      doc: 'The sprites directory.',
      format: String,
      default: 'sprites'
    },
    static: {
      doc: 'The static directory.',
      format: String,
      default: 'static'
    },
    styles: {
      doc: 'The styles directory.',
      format: String,
      default: 'styles'
    }
  }
}

const config = convict(schema)

config.validate({
  allowed: 'strict'
})

module.exports = config
