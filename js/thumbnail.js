const container = document.querySelector('.pictures');

const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const createThumbnail = ({id, url, description, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').dataset.thumbnailId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
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

  container.append(fragment);
};

export {renderThumbnails};
