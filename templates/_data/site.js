/* eslint 'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }] */

const eleventyPkg = require('@11ty/eleventy/package.json')

module.exports = {
  name: 'Site Name',
  origin: 'https://example.com',
  eleventyVersion: eleventyPkg.version,
}
