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

const resetScale = () => updateScale(DEFAULT_SCALE);

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

export {updateScale, resetScale};
