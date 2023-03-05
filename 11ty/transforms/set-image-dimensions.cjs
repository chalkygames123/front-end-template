'use strict';

const { Buffer } = require('node:buffer');
const { extname, dirname, isAbsolute, join, relative } = require('node:path');

const { JSDOM } = require('jsdom');
const sharp = require('sharp');
const { parse: parseSrcset } = require('srcset');

const config = require('../../config.cjs');

const isValidSourceUrl = (sourceUrl) => {
	if (!sourceUrl) return false;

	try {
		return ['http:', 'https:'].includes(new URL(sourceUrl).protocol);
	} catch {
		return true;
	}
};

const isUrl = (string) => {
	try {
		return Boolean(new URL(string));
	} catch {
		return false;
	}
};

const normalizeSourceUrl = (sourceUrl, outputPath) => {
	if (isUrl(sourceUrl)) {
		return sourceUrl;
	}

	if (isAbsolute(sourceUrl)) {
		return join(config.get('srcDir'), sourceUrl);
	}

	return join(
		config.get('srcDir'),
		relative(
			join(config.get('distDir'), config.get('publicPath')),
			join(dirname(outputPath), sourceUrl),
		),
	);
};

const getMetadata = async (sourceUrl) => {
	if (isUrl(sourceUrl)) {
		const response = await fetch(sourceUrl);

		if (!response.ok) {
			throw new Error(
				`Failed to load resource: the server responded with a status of ${response.status}`,
			);
		}

		const arrayBuffer = await response.arrayBuffer();

		return sharp(Buffer.from(arrayBuffer)).metadata();
	}

	return sharp(sourceUrl).metadata();
};

const setDimensions = (element, width, height) => {
	if (!element.hasAttribute('width')) {
		element.setAttribute('width', width);
	}

	if (!element.hasAttribute('height')) {
		element.setAttribute('height', height);
	}
};

const setImageDimensions = async function (content) {
	if (!['.html', '.php'].includes(extname(this.page.outputPath)))
		return content;

	const dom = new JSDOM(content);
	const {
		window: { document },
	} = dom;

	await Promise.all([
		...[...document.images]
			.filter((item) => isValidSourceUrl(item.src))
			.map(async (item) => {
				const metadata = await getMetadata(
					normalizeSourceUrl(item.src, this.page.outputPath),
				);

				setDimensions(item, metadata.width, metadata.height);
			}),
		...[...document.querySelectorAll('picture > source')]
			.filter((item) => isValidSourceUrl(parseSrcset(item.srcset)[0].url))
			.map(async (item) => {
				const metadata = await getMetadata(
					normalizeSourceUrl(
						parseSrcset(item.srcset)[0].url,
						this.page.outputPath,
					),
				);

				setDimensions(item, metadata.width, metadata.height);
			}),
	]);

	const result = dom.serialize();

	return result;
};

module.exports = setImageDimensions;
