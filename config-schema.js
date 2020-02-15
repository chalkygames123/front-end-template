const convict = require('convict')

const schema = {
  mode: {
    doc: 'The mode of the build.',
    format: ['production', 'development'],
    default: 'production',
    arg: 'mode'
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
  },
  ext: {
    images: {
      doc: 'The images extension.',
      format: String,
      default: '.+(png|jp?(e)g|gif|svg)'
    },
    scripts: {
      doc: 'The scripts extension.',
      format: String,
      default: '.js'
    },
    sprites: {
      doc: 'The sprites extension.',
      format: String,
      default: '.svg'
    },
    styles: {
      doc: 'The styles extension.',
      format: String,
      default: '.scss'
    }
  }
}

const config = convict(schema)

config.validate({
  allowed: 'strict'
})

module.exports = config
