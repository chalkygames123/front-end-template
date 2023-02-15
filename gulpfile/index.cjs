'use strict';

const { config } = require('dotenv');

config();

module.exports = require('./tasks/index.cjs');
