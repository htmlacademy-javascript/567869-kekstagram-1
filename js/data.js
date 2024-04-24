import { AVATAR_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, COMMENT_COUNT } from './consts.js';
import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const COMMENT_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES_LIST = ['Данила', 'Даша', 'Артём', 'Вика', 'Сергей', 'Саша'];
const DESCRIPTIONS_LIST = [
  'Если у вас не работает видеоплеер',
  'попробуйте отключить AdBlock в браузере.',
  'Возможно, именно он блокирует проигрывание записи.',
  'Использование VPN или Proxy сервисов также может блокировать работу видеоплеера',
  'попробуйте отключить их и воспроизвести видео ещё раз.',
  'Нажмите кнопку «Готово», чтобы сохранить прогресс'
];

const generateCommentId = createIdGenerator();

const createMessage = () => {
  const uniqueComments = [...new Set(COMMENT_LIST)];
  const message = [];
  for (let i = 0; i < 2; i++) {
    const comment = getRandomArrayElement(uniqueComments);
    message.push(comment);
    uniqueComments.splice(uniqueComments.indexOf(comment), 1);
  }

  return message.join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES_LIST)
});

const createPicture = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS_LIST),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment
  ),
});

const getPictures = (count) =>
  Array.from({ length: count }, createPicture);

export { getPictures };

