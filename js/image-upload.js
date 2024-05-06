import { FILE_TYPES } from './consts.js';
import { resetValidate, setFormEditSubmit } from './form-validate.js';
import { resetImageEdit } from './image-edit/image-edit.js';
import { body, isEscapeKey, toggleClass } from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadImage = imageUploadForm.querySelector('#upload-file');
const uploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const previewImage = uploadOverlay.querySelector('.img-upload__preview img');
const uploadCancel = uploadOverlay.querySelector('#upload-cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const textAreaInput = uploadOverlay.querySelector('.text__description');

const openImageEdit = () => {
  toggleClass(uploadOverlay, 'hidden', false);
  toggleClass(body, 'modal-open', true);

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeImageEdit = () => {
  const errorMessage = document.querySelector('.error');

  if (errorMessage) {
    toggleClass(body, 'modal-open', false);
  } else {
    imageUploadForm.reset();
    resetValidate();
    resetImageEdit();
    toggleClass(uploadOverlay, 'hidden', true);
    toggleClass(body, 'modal-open', false);
  }

  document.removeEventListener('keydown', onDocumentKeydown);
};

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
    const file = uploadImage.files[0];
    const fileName = file.name.toLowerCase();
    const fileUrl = URL.createObjectURL(file);
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewImage.src = fileUrl;
      const effectsPreview = document.querySelectorAll('.effects__preview');
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url(${fileUrl})`;
      });
    }
    openImageEdit();
  });

  uploadCancel.addEventListener('click', () => {
    closeImageEdit();
  });
};

setFormEditSubmit(closeImageEdit);

export {
  imageUploadInit,
  onDocumentKeydown
};
