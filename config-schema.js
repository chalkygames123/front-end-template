const path = require('path')

const convict = require('convict')

convict.addFormat({
  name: 'globs',
  validate: value => {
    if (
      (typeof value !== 'string' && !Array.isArray(value)) ||
      (Array.isArray(value) && value.some(el => typeof el !== 'string'))
    ) {
      throw new TypeError('must be a string or an array of strings')
    }
  }
})

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
  gzip: {
    doc: 'Whether to enable gzip compression.',
    format: Boolean,
    default: false,
    arg: 'gzip'
  },
  webp: {
    doc: 'Whether to enable WebP compression.',
    format: Boolean,
    default: false,
    arg: 'webp'
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
  },
  srcPaths: {
    copy: {
      doc: 'The copy source paths.',
      format: 'globs',
      default: ''
    },
    images: {
      doc: 'The images source paths.',
      format: 'globs',
      default: ''
    },
    includes: {
      doc: 'The includes source paths.',
      format: 'globs',
      default: ''
    },
    layouts: {
      doc: 'The layouts source paths.',
      format: 'globs',
      default: ''
    },
    pages: {
      doc: 'The pages source paths.',
      format: 'globs',
      default: ''
    },
    scripts: {
      doc: 'The scripts source paths.',
      format: 'globs',
      default: ''
    },
    sprites: {
      doc: 'The sprites source paths.',
      format: 'globs',
      default: ''
    },
    styles: {
      doc: 'The styles source paths.',
      format: 'globs',
      default: ''
    }
  }
}

const config = convict(schema)

config.validate({
  allowed: 'strict'
})

config.load({
  srcPaths: {
    copy: [
      path.join(config.get('srcDir'), config.get('dir.static'), '**'),
      '!**/.gitkeep'
    ],
    images: path.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.images'),
      '**',
      `*${config.get('ext.images')}`
    ),
    includes: path.join(
      config.get('srcDir'),
      config.get('dir.includes'),
      '**',
      `*${config.get('ext.templates')}`
    ),
    layouts: path.join(
      config.get('srcDir'),
      config.get('dir.layouts'),
      '**',
      `*${config.get('ext.templates')}`
    ),
    pages: path.join(
      config.get('srcDir'),
      config.get('dir.pages'),
      '**',
      `!(-)*${config.get('ext.templates')}`
    ),
    scripts: path.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.scripts'),
      '**',
      `!(_)*${config.get('ext.scripts')}`
    ),
    sprites: path.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.images'),
      config.get('dir.sprites'),
      '**',
      `*${config.get('ext.sprites')}`
    ),
    styles: path.join(
      config.get('srcDir'),
      config.get('dir.assets'),
      config.get('dir.styles'),
      '**',
      `*${config.get('ext.styles')}`
    )
  }
})

config.validate({
  allowed: 'strict'
})

module.exports = config
