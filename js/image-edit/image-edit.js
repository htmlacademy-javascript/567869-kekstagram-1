import { resetEffect } from './effects.js';
import { DEFAULT_SCALE } from './image-edit-consts.js';
import { resetScale, updateScale } from './scale.js';

const resetImageEdit = () => {
  resetScale();
  resetEffect();
};

updateScale(DEFAULT_SCALE);

export {resetImageEdit};
