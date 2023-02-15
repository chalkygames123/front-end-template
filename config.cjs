'use strict';

const config = require('./config-schema.cjs');

/**
 * For available configurations, see: config-schema.js
 */
config.load({});

config.validate({
	allowed: 'strict',
});

module.exports = config;
