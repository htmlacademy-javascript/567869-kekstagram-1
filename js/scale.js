import { DEFAULT_SCALE, SCALE_MAX, SCALE_MIN, SCALE_STEP } from './consts.js';

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const valueField = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = (newScale) => {
  currentScale = newScale;
  valueField.value = `${currentScale}%`;
  valueField.setAttribute('value', `${currentScale}%`);
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

<<<<<<< HEAD
const resetScale = () => updateScale(DEFAULT_SCALE);

=======
>>>>>>> f3126a6ba52b2f30f5e8121606dfe4dfee6b575a
smallerBtn.addEventListener('click', () => {
  const newScale = currentScale - SCALE_STEP;
  if (newScale >= SCALE_MIN) {
    updateScale(newScale);
  }
});

biggerBtn.addEventListener('click', () => {
  const newScale = currentScale + SCALE_STEP;
  if (newScale <= SCALE_MAX) {
    updateScale(newScale);
  }
});

<<<<<<< HEAD
export {updateScale, resetScale};
=======
export {updateScale};
>>>>>>> f3126a6ba52b2f30f5e8121606dfe4dfee6b575a
