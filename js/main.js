const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Данила', 'Даша', 'Артём', 'Вика', 'Сергей', 'Саша'];
const DESCRIPTIONS = [
    'Если у вас не работает видеоплеер', 'попробуйте отключить AdBlock в браузере.', 'Возможно, именно он блокирует проигрывание записи.', 'Использование VPN или Proxy сервисов также может блокировать работу видеоплеера', 'попробуйте отключить их и воспроизвести видео ещё раз.', 'Нажмите кнопку «Готово», чтобы сохранить прогресс'
];

const MESSAGES = [

];

function createIdGenerator() {
    let lastGeneratedId = 0;

    return function () {
        lastGeneratedId += 1;
        return lastGeneratedId;
    };
};

const generatePictureId = createIdGenerator();
const generateUrlId = createIdGenerator();
const generateCommentId = createIdGenerator();

function getRandomInteger (min, max) {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
  
    return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => 
    Array.from({length: getRandomInteger(1, 2)}, () =>
        getRandomArrayElement(COMMENT_LINES)
    ).join(' ');

const createComment = () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES)  
});

const createPicture = () => ({
    id: generatePictureId(),
    url: `photos/${generateUrlId()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from(
        { length: getRandomInteger(0, COMMENT_COUNT) },
        createComment
    ),
});

const getPictures = Array.from({length: PICTURE_COUNT}, createPicture);

console.log(getPictures);