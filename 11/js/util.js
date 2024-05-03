import { ALERT_SHOW_TIME } from './consts.js';

const body = document.body;

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElementWithClass = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const toggleClass = (element, className, isEnabled) => {
  element.classList.toggle(className, isEnabled);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { body, isEscapeKey, createElementWithClass, toggleClass, showAlert };
