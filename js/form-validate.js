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

const ErrorMessages = {
  INVALID_HASHTAG: 'введен невалидный хештег',
  HASHTAG_QUANTITY: 'превышено количество хештегов',
  UNIQUE_HASHTAG: 'хештеги не могут повторяться',
  TEXTAREA_LENGTH: 'длина комментария не может быть больше 140 символов'
};

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtagArray = (value) => value.split(' ');
const validateHashtags = (value) => {
  const hashtagArrayValue = getHashtagArray(value);

  if (value !== '' && !hashtagArrayValue.every((tag) => hashtagRegex.test(tag))) {
    return ErrorMessages.INVALID_HASHTAG;
  }

  if (hashtagArrayValue.length > NUMBER_TAGS) {
    return ErrorMessages.HASHTAG_QUANTITY;
  }

  const uniqueHashtag = new Set(hashtagArrayValue
    .map((tag) => tag.toLowerCase())).size === hashtagArrayValue.length;

  if (!uniqueHashtag) {
    return ErrorMessages.UNIQUE_HASHTAG;
  }
  return '';
};

const validateComment = (value) =>
  value.length > TEXTAREA_SYMBOLS ? ErrorMessages.TEXTAREA_LENGTH : '';

pristine.addValidator(hashtagsInput, (value) => !validateHashtags(value), validateHashtags);
pristine.addValidator(textAreaInput, (value) => !validateComment(value), validateComment);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую..';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setFormEditSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      try {
        const response = await sendData(new FormData(evt.target));
        onSuccess(response);
        showSuccessMessage();
      } catch (err) {
        showErrorMessage(err.message);
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

const resetValidate = () => {
  pristine.reset();
};

export {setFormEditSubmit, resetValidate};
