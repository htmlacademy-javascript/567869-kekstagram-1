import { showBigPicture } from './big-picture.js';
import { renderThumbnails } from './thumbnail.js';

const containerPictures = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  containerPictures.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });

  renderThumbnails (pictures, containerPictures);
};

export {renderGallery};
