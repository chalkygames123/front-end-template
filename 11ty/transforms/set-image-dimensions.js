const { Buffer } = require('node:buffer');
const { isAbsolute, join } = require('node:path');

const { JSDOM } = require('jsdom');
const sharp = require('sharp');
const { parse: parseSrcset } = require('srcset');

const config = require('../../config');

const getMetadata = (src) =>
	(isAbsolute(src)
		? Promise.resolve(join(config.get('srcDir'), src))
		: fetch(src)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Unexpected response status ${response.status}`);
					}

					return response.arrayBuffer();
				})
				.then((arrayBuffer) => Buffer.from(arrayBuffer))
	).then((input) => sharp(input).metadata());
const setDimensions = (image, width, height) => {
	image.setAttribute('width', width);
	image.setAttribute('height', height);
};

module.exports = async function setImageDimensions(content) {
	if (!/\.html$/.test(this.page.outputPath)) return content;

	const dom = new JSDOM(content);
	const {
		window: { document },
	} = dom;

	await Promise.all([
		...Array.from(document.images).map((item) =>
			getMetadata(item.src).then((metadata) =>
				setDimensions(item, metadata.width, metadata.height),
			),
		),
		...Array.from(document.querySelectorAll('picture > source')).map((item) =>
			getMetadata(parseSrcset(item.srcset)[0].url).then((metadata) =>
				setDimensions(item, metadata.width, metadata.height),
			),
		),
	]);

	const result = dom.serialize();

	return result;
};
