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
  https: {
    doc: 'Whether to enable HTTPS.',
    format: Boolean,
    default: false,
    arg: 'https'
  },
  index: {
    doc: 'The index path for web server',
    format: String,
    default: ''
  },
  site: {
    name: {
      doc: 'The site name.',
      format: String,
      default: 'Site Name'
    },
    origin: {
      doc: 'The origin of the site.',
      format: value => {
        if (/\/$/.test(value)) {
          throw new Error('must not have a trailing slash')
        }
      },
      default: 'https://example.com'
    },
    basePath: {
      doc: 'The base path of the site.',
      format: value => {
        if (!/^(?=\/)(?!.*\/{2,})[^\s\\]+(?<=\/)$/.test(value)) {
          throw new Error(
            'must have leading and trailing slashes, and must not have duplicates'
          )
        }
      },
      default: '/'
    }
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
    includes: {
      doc: 'The includes directory.',
      format: String,
      default: 'includes'
    },
    layouts: {
      doc: 'The layouts directory.',
      format: String,
      default: 'layouts'
    },
    pages: {
      doc: 'The pages directory.',
      format: String,
      default: 'pages'
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
    templates: {
      doc: 'The templates extension.',
      format: String,
      default: '.njk'
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
