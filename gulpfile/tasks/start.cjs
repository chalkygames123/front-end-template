const { series } = require('gulp');

const build = require('./build.cjs');
const serve = require('./serve.cjs');

module.exports = series(build, serve);
