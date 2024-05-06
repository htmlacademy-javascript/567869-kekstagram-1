import { resetEffect } from './effects.js';
import { DEFAULT_SCALE } from './image-edit-consts.js';
import { resetScale, updateScale } from './scale.js';

updateScale(DEFAULT_SCALE);

const resetImageEdit = () => {
  resetScale();
  resetEffect();
};

export {resetImageEdit};
