const { parallel, series } = require('gulp');

const clean = require('./clean.cjs');
const copy = require('./copy.cjs');
const images = require('./images.cjs');
const scripts = require('./scripts.cjs');
const styles = require('./styles.cjs');
const templates = require('./templates.cjs');

module.exports = series(
	clean,
	parallel(copy, images, scripts, styles, templates),
);
