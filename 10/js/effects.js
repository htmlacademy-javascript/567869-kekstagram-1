import { toggleClass } from './util.js';

const effects = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const effectSettings = {
  none: {},
  chrome: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  sepia: {
    range: { min: 0, max: 1},
    start: 1,
    step: 0.1
  },
  marvin: {
    range: { min: 0, max: 100},
    start: 100,
    step: 1
  },
  phobos: {
    range: { min: 0, max: 3},
    start: 3,
    step: 0.1
  },
  heat: {
    range: { min: 1, max: 3},
    start: 3,
    step: 0.1
  }
};

const setEffect = (effect) => {
  previewImage.className = `effects__preview--${effect}`;
  currentEffect = effect;
  toggleClass(effectLevelContainer, 'hidden', effect === 'none');

  if (effect !== 'none') {
    effectSlider.noUiSlider.updateOptions(effectSettings[effect]);
    effectSlider.noUiSlider.set(effectSettings[effect].start);
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
      effectLevelValue.setAttribute('value', 0);
  }
};

const resetEffect = () => {
  setEffect('none');
  effectSlider.noUiSlider.set(100);
};

const initSlider = () => {
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectSlider.noUiSlider.on('update', () => {
    const value = effectSlider.noUiSlider.get();
    setEffectLevel(parseFloat(value));
  });
};

for (const effect of effects) {
  effect.addEventListener('change', () => {
    setEffect(effect.value);
    setEffectLevel(effectSettings[effect.value].start);
  });
}

initSlider();
setEffect(currentEffect);

export {resetEffect};
