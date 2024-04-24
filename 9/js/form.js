import { NUMBER_TAGS, TEXTAREA_SYMBOLS } from './consts.js';
import { isEscapeKey, toggleClass } from './util.js';

const form = document.querySelector('.img-upload__form');
const photoEditor = document.querySelector('.img-upload__overlay');
const photoUpload = document.querySelector('#upload-file');
const photoEditorClose = document.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const textAreaInput = form.querySelector('.text__description');
const validateHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtagArray = (value) => value.split(' ');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isHashtagValid = (value) => {
  const hashtagArrayValue = getHashtagArray(value);
  return value === '' || hashtagArrayValue.every((tag) => validateHashtag.test(tag));
};

const isHastTagQuantity = (value) => {
  const hashtagArray = getHashtagArray(value);
  return hashtagArray.length <= NUMBER_TAGS;
};

const isUniqueHashtag = (value) => {
  const hashtagArray = getHashtagArray(value).map((arrayElement) => arrayElement.toLowerCase());
  const uniqueHashtag = hashtagArray.filter((tag, index, tags) => tags.indexOf(tag) !== index);

  return uniqueHashtag.length === 0;
};

const isTextareaLength = (value) => value.length === 0 || value.length <= TEXTAREA_SYMBOLS;

pristine.addValidator(hashtagsInput, isHashtagValid, 'введён невалидный хэштег', 3, true);
pristine.addValidator(hashtagsInput, isHastTagQuantity, 'превышено количество хэштегов', 1, true);
pristine.addValidator(hashtagsInput, isUniqueHashtag, 'хэштеги не могут повторятся', 2, true);
pristine.addValidator(textAreaInput, isTextareaLength, 'длина комментария не может быть больше 140 символов');

const validatingForm = () => {
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();

    if (!isValid) {
      evt.preventDefault();
    }
  });
};

const openPhotoEditor = () => {
  validatingForm();
  toggleClass(photoEditor, 'hidden', false);
  toggleClass(document.body, 'modal-open', true);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoEditor = () => {
  form.reset();
  pristine.reset();

  toggleClass(photoEditor, 'hidden', true);
  toggleClass(document.body, 'modal-open', false);

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsInput || document.activeElement === textAreaInput) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
}

const photoEditorInit = () => {
  photoUpload.addEventListener('change', () => {
    openPhotoEditor();
  });

  photoEditorClose.addEventListener('click', () => {
    closePhotoEditor();
  });
};

export {photoEditorInit};
