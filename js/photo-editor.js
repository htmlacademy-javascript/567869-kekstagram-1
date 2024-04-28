import { NUMBER_TAGS, TEXTAREA_SYMBOLS } from './consts.js';
import { body, isEscapeKey, toggleClass } from './util.js';

const form = document.querySelector('.img-upload__form');
const photoEditor = document.querySelector('.img-upload__overlay');
const photoUpload = document.querySelector('#upload-file');
const photoEditorClose = document.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const textAreaInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const errorMessages = {
  invalidHashtag: 'введен невалидный хештег',
  hashtagQuantity: 'превышено количество хештегов',
  uniqueHashtag: 'хештеги не могут повторяться',
  textareaLength: 'длина комментария не может быть больше 140 символов'
};

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtagArray = (value) => value.split(' ');
const validateHashtags = (value) => {
  const hashtagArrayValue = getHashtagArray(value);

  if (value !== '' && !hashtagArrayValue.every((tag) => hashtagRegex.test(tag))) {
    return errorMessages.invalidHashtag;
  }

  if (hashtagArrayValue.length > NUMBER_TAGS) {
    return errorMessages.hashtagQuantity;
  }

  const uniqueHashtag = new Set(hashtagArrayValue
    .map((tag) => tag.toLowerCase())).size === hashtagArrayValue.length;

  if (!uniqueHashtag) {
    return errorMessages.uniqueHashtag;
  }
  return '';
};

const validateComment = (value) => {
  if (value.length > TEXTAREA_SYMBOLS) {
    return errorMessages.textareaLength;
  }
  return '';
};

pristine.addValidator(hashtagsInput, (value) => {
  const error = validateHashtags(value);
  return !error;
}, validateHashtags);

pristine.addValidator(textAreaInput, (value) => {
  const error = validateComment(value);
  return !error;
}, validateComment);

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
  toggleClass(body, 'modal-open', true);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhotoEditor = () => {
  form.reset();
  pristine.reset();

  toggleClass(photoEditor, 'hidden', true);
  toggleClass(body, 'modal-open', false);

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
