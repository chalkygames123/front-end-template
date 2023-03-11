import gulp from 'gulp';

import { build } from './build.js';
import { serve } from './serve.js';

const { series } = gulp;

export const start = series(build, serve);
