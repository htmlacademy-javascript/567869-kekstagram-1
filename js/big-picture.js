import { COMMENTS_PER_LOAD } from './consts.js';
import { createElementWithClass, isEscapeKey, toggleClass } from './util.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const commentFragment = document.createDocumentFragment();
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsCurrentSpan = commentsCount.querySelector('.social__comments-current');

let shownCommentsCount = 0;
let currentComments = [];

const createCommentElement = ({ avatar, name, message }) => {
  const commentItem = createElementWithClass('li', 'social__comment');
  const commentImage = createElementWithClass('img', 'social__picture');
  const commentMessage = createElementWithClass('p', 'social__text');

  commentImage.src = avatar;
  commentImage.alt = name;
  commentImage.width = 35;
  commentImage.height = 35;
  commentMessage.textContent = message;

  commentItem.append(commentImage);
  commentItem.append(commentMessage);

  return commentItem;
};

const renderComments = (comments) => {
  shownCommentsCount = 0;
  currentComments = comments;

  commentsList.innerHTML = '';
  const displayedComments = comments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_LOAD);

  displayedComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentFragment.append(commentElement);
  });
  commentsList.append(commentFragment);

  toggleClass(commentsLoader, 'hidden', comments.length <= COMMENTS_PER_LOAD);
  commentsCurrentSpan.textContent = displayedComments.length;
};

const onCommentsLoaderClick = () => {
  shownCommentsCount += COMMENTS_PER_LOAD;
  const newComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_LOAD);

  newComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentFragment.append(commentElement);
  });
  commentsList.append(commentFragment);

  toggleClass(commentsLoader, 'hidden', newComments.length < COMMENTS_PER_LOAD);
  commentsCurrentSpan.textContent = newComments.length + shownCommentsCount;
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

const renderPictureDetails = ({ url, description, comments, likes }) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  commentsCount.querySelector('.comments-count').textContent = comments.length;
};

const showBigPicture = (picturesData) => {
  toggleClass(bigPicture, 'hidden', false);
  toggleClass(body, 'modal-open', true);
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(picturesData);
  renderComments(picturesData.comments);
};

const hideBigPicture = () => {
  toggleClass(bigPicture, 'hidden', true);
  toggleClass(body, 'modal-open', false);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => hideBigPicture();
bigPictureCancel.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
