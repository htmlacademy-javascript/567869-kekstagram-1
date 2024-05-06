import { RANDOM_PICTURES_COUNT } from './consts.js';
import { createThumbnail } from './thumbnail.js';
import { debounce, toggleClass } from './util.js';

const filters = document.querySelector('.img-filters');
const imgFiltersForm = filters.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

let originalPictures = [];

const clearPictures = () => {
  const currentPictures = picturesContainer.querySelectorAll('.picture');
  currentPictures.forEach((picture) => {
    picture.remove();
  });
};

const renderPictures = (pictures) => {
  clearPictures();
  pictures.forEach((picture) => {
    picturesContainer.appendChild(createThumbnail(picture));
  });
};

const enableFilters = (pictures) => {
  toggleClass(filters, 'img-filters--inactive', false);
  originalPictures = pictures;

  const debouncedRenderPictures = debounce(renderPictures);

  imgFiltersForm.addEventListener('click', (evt) => {
    if (!evt.target.matches('button')) {
      return;
    }

    const currentActiveFilterButton = imgFiltersForm.querySelector('.img-filters__button--active');
    toggleClass(currentActiveFilterButton, 'img-filters__button--active', false);
    toggleClass(evt.target, 'img-filters__button--active', true);

    const defaultFilter = document.querySelector('#filter-default');
    const randomFilter = document.querySelector('#filter-random');
    const discussedFilter = document.querySelector('#filter-discussed');

    if (evt.target.contains(defaultFilter)) {
      debouncedRenderPictures(originalPictures);
    } else if (evt.target.contains(randomFilter)) {
      debouncedRenderPictures(originalPictures.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_COUNT));
    } else if (evt.target.contains(discussedFilter)) {
      debouncedRenderPictures(originalPictures.slice().sort((a, b) => b.comments.length - a.comments.length));
    }
  });
};

export { enableFilters };
