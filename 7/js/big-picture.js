const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentFragment = document.createDocumentFragment();
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach(({avatar, name, message}) => {
    const commentItem = document.createElement('li');
    const commentImage = document.createElement('img');
    const commentMessage = document.createElement('p');

    commentItem.classList.add('social__comment');
    commentImage.classList.add('social__picture');
    commentMessage.classList.add('social__text');
    commentImage.src = avatar;
    commentImage.alt = name;
    commentImage.width = 35;
    commentImage.height = 35;
    commentMessage.textContent = message;

    commentItem.append(commentImage);
    commentItem.append(commentMessage);

    commentFragment.append(commentItem);
  });

  commentsList.append(commentFragment);
};

const renderPictureDetails = ({url, description, comments, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
};

const showBigPicture = (picturesData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(picturesData);
  renderComments(picturesData.comments);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => hideBigPicture();
bigPictureCancel.addEventListener('click', onCancelButtonClick);

export {showBigPicture};
