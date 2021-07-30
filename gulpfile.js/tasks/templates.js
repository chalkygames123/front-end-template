const Eleventy = require('@11ty/eleventy')

const config = require('../../config')

const eleventy = new Eleventy()

async function templates() {
	await eleventy.init()

	if (config.get('watch')) {
		await eleventy.watch()
	} else {
		await eleventy.write()
	}
}

module.exports = templates
