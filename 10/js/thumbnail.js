const containerPictures = document.querySelector('.pictures');

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createThumbnail = ({id, url, description, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const pictureImg = thumbnail.querySelector('.picture__img');

  pictureImg.dataset.thumbnailId = id;
  pictureImg.src = url;
  pictureImg.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (thumbnails) => {
  const fragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => {
    const pictureElement = createThumbnail(thumbnail);
    fragment.append(pictureElement);
  });

  containerPictures.append(fragment);
};

export {renderThumbnails};
