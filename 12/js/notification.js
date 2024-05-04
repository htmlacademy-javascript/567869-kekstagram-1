import { onDocumentKeydown } from './image-upload.js';
import { body, isEscapeKey, toggleClass } from './util.js';

const createMessage = (template, className, button) => {
  const messageTemplate = document.querySelector(template)
    .content
    .querySelector(className)
    .cloneNode(true);
  const messageInner = messageTemplate.querySelector(`${className}__inner`);
  const messageButton = messageTemplate.querySelector(button);

  const closeMessage = () => {
    body.removeChild(messageTemplate);
    toggleClass(body, 'modal-open', false);

    messageButton.removeEventListener('click', closeMessage);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onMessageKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentClick (evt) {
    if (!messageInner.contains(evt.target)) {
      closeMessage();
    }
  }

  function onMessageKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  body.appendChild(messageTemplate);
  messageButton.addEventListener('click', closeMessage);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => {
  createMessage('#success', '.success', '.success__button');
};

const showErrorMessage = () => {
  createMessage('#error', '.error', '.error__button');
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { showSuccessMessage, showErrorMessage };
