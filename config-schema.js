/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const convict = require('convict')

const schema = {
  mode: {
    doc: 'The mode of the build.',
    format: ['production', 'development'],
    default: 'production',
    arg: 'mode',
  },
  watch: {
    doc: 'Whether to enable watch mode.',
    format: Boolean,
    default: false,
    arg: 'watch',
  },
  srcDir: {
    doc: 'The source directory.',
    format: String,
    default: '.',
    arg: 'src-dir',
  },
  distDir: {
    doc: 'The dist directory.',
    format: String,
    default: 'dist',
    arg: 'dist-dir',
  },
  publicPath: {
    doc: 'The public path of the site.',
    format: String,
    default: '/',
  },
}

const config = convict(schema)

config.validate({
  allowed: 'strict',
})

module.exports = config
