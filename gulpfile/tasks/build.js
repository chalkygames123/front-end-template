import gulp from 'gulp';

import { clean } from './clean.js';
import { copy } from './copy.js';
import { images } from './images.js';
import { scripts } from './scripts.js';
import { styles } from './styles.js';
import { templates } from './templates.js';

const { parallel, series } = gulp;

export const build = series(
	clean,
	parallel(copy, images, scripts, styles, templates),
);
