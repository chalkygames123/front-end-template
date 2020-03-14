const Eleventy = require('@11ty/eleventy')

const config = require('../../config')

async function templates(cb) {
  const eleventy = new Eleventy()

  await eleventy.init()

  if (config.get('watch')) {
    await eleventy.watch()
  } else {
    await eleventy.write()
  }

  cb()
}

module.exports = templates
