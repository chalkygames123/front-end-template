import convict from 'convict'

const config = convict({
  env: {
    doc: 'The site environment.',
    format: ['production', 'development'],
    default: 'production',
    env: 'NODE_ENV'
  },
  srcDir: {
    doc: 'The source directory.',
    format: String,
    default: '.'
  },
  distDir: {
    doc: 'The dist directory.',
    format: String,
    default: 'dist'
  },
  gzip: {
    doc: 'Whether to enable gzip compression.',
    format: Boolean,
    default: true
  },
  webp: {
    doc: 'Whether to enable WebP compression.',
    format: Boolean,
    default: false
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
          throw new Error('must not have trailing slash')
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
  }
})

config.validate({
  allowed: 'strict'
})

export default config
