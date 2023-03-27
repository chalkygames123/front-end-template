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

const rebaseSourceUrl = (sourceUrl, outputPath) => {
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
	if (
		!this.page.outputPath ||
		!['.html', '.php'].includes(extname(this.page.outputPath))
	) {
		return content;
	}

	const dom = new JSDOM(content);
	const {
		window: { document },
	} = dom;

	await Promise.all([
		...[...document.images]
			.filter((element) => isValidSourceUrl(element.src))
			.map(async (element) => {
				const metadata = await getMetadata(
					rebaseSourceUrl(element.src, this.page.outputPath),
				);

				setDimensions(element, metadata.width, metadata.height);
			}),
		...[...document.querySelectorAll('picture > source')]
			.filter((element) => isValidSourceUrl(parseSrcset(element.srcset)[0].url))
			.map(async (element) => {
				const metadata = await getMetadata(
					rebaseSourceUrl(
						parseSrcset(element.srcset)[0].url,
						this.page.outputPath,
					),
				);

				setDimensions(element, metadata.width, metadata.height);
			}),
	]);

	const result = dom.serialize();

	return result;
};

module.exports = setImageDimensions;
