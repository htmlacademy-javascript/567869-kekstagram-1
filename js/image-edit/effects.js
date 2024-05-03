import { toggleClass } from '../util.js';
import { EFFECT_SETTINGS } from './image-edit-consts.js';

const form = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const setEffect = (effect) => {
  previewImage.className = `effects__preview--${effect}`;
  currentEffect = effect;
  toggleClass(effectLevelContainer, 'hidden', effect === 'none');

  if (effect !== 'none') {
    effectSlider.noUiSlider.updateOptions(EFFECT_SETTINGS[effect]);
    effectSlider.noUiSlider.set(EFFECT_SETTINGS[effect].start);
  }
};

const setEffectLevel = (effectLevel) => {
  effectLevelValue.valueAsNumber = effectLevel;
  effectLevelValue.setAttribute('value', effectLevel);

  switch(currentEffect) {
    case 'chrome':
      previewImage.style.filter = `grayscale(${effectLevel})`;
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${effectLevel})`;
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${effectLevel}%)`;
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${effectLevel}px)`;
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${effectLevel})`;
      break;
    default:
      previewImage.style.filter = '';
      effectLevelValue.removeAttribute('value');
  }
};

const resetEffect = () => {
  setEffect('none');
  effectSlider.noUiSlider.set(100);
};

const initSlider = () => {
  noUiSlider.create(effectSlider, EFFECT_SETTINGS.default);

  effectSlider.noUiSlider.on('update', () => {
    const value = effectSlider.noUiSlider.get();
    setEffectLevel(parseFloat(value));
  });
};

initSlider();
setEffect(currentEffect);

form.addEventListener('change', (event) => {
  if (event.target.classList.contains('effects__radio')) {
    setEffect(event.target.value);
    setEffectLevel(EFFECT_SETTINGS[event.target.value].start);
  }
});

export {resetEffect};
