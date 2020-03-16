/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      grid: 'autoplace'
    })
  ]
}
