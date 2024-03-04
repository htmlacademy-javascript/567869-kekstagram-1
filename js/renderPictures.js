import { getPictures } from './data.js';

const PICTURES_COUNT = 25;

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictures = getPictures(PICTURES_COUNT);

const pictureListFragment = document.createDocumentFragment();
renderPictures.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.append(pictureElement);
});

pictures.append(pictureListFragment);
