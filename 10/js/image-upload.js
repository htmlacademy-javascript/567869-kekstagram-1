import { resetValidate, setFormEditSubmit } from './form-validate.js';
import { resetImageEdit } from './image-edit/image-edit.js';
import { body, isEscapeKey, toggleClass } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadImage = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const textAreaInput = form.querySelector('.text__description');

const openImageEdit = () => {
  toggleClass(uploadOverlay, 'hidden', false);
  toggleClass(body, 'modal-open', true);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImageEdit = () => {
  form.reset();
  resetValidate();
  resetImageEdit();
  toggleClass(uploadOverlay, 'hidden', true);

  document.removeEventListener('keydown', onDocumentKeydown);
};

setFormEditSubmit(closeImageEdit);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsInput || document.activeElement === textAreaInput) {
      evt.stopPropagation();
    } else {
      closeImageEdit();
    }
  }
}

const imageUploadInit = () => {
  uploadImage.addEventListener('change', () => {
    openImageEdit();
  });

  uploadCancel.addEventListener('click', () => {
    closeImageEdit();
  });
};

export {imageUploadInit, onDocumentKeydown};
