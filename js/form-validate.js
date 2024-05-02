import { sendData } from './api.js';
import { NUMBER_TAGS, TEXTAREA_SYMBOLS } from './consts.js';
import { showErrorMessage, showSuccessMessage } from './notification.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const textAreaInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

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


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую..';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setFormEditSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(() => unblockSubmitButton());
    }
  });
};

const resetValidate = () => {
  pristine.reset();
};

export {setFormEditSubmit, resetValidate};
