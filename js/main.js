'use strict';

var PHOTOS_COUNT = 25;
var PHOTOS_DESCTIPTIONS = [
  'Lorem ipsum dolor sit amet.',
  'Tempora saepe eius, illum temporibus.',
  'Quam amet vero, maxime obcaecati',
  'Vero voluptatibus porro, aperiam sequi quibusdam est',
  'Laudantium magni rem, pariatur, quisquam vitae',
  'Pariatur at doloremque voluptatibus'
];
var MIN_COMMENTS = 1; // Не может быть больше чем COMMENTS.length
var MAX_COMMENTS = 6; // Не может быть больше чем COMMENTS.length
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var USER_NAMES = [
  'Руслан',
  'Дарья',
  'Денис',
  'Василиса',
  'Олег',
  'Софья'
];
var FIRST_AVATAR_ID = 1;
var LAST_AVATAR_ID = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var photoListElement = document.querySelector('.pictures');

/**
 * Генерирует случайное число в диапазоне
 *
 * @param {number} min Минимальное значение числа
 * @param {number} max Максимальное значение числа
 * @return {number} Сгенерированное число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (++max - min) + min);
};

/**
 * Выбирает случайный элемент массива
 *
 * @param {array} array
 * @return {any} Элемент массива
 */
var getRandomArrayItem = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

/**
 * Перемешивает элементы массива
 *
 * @param {array} array Массив который будет перемешан
 * @return {array} Перемешанный массив
 */
var shuffleArray = function (array) {
  var i = array.length;
  var j = 0;
  var temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

/**
 * Генерирует случайные комментарии
 *
 * @param {number} count Кол-во генерируемых комментариев
 * @return {Object[]} Массив сгенерированных комментариев
 */
var getRandomComments = function (count) {
  var comments = [];

  var commentSamples = shuffleArray(COMMENTS);
  for (var i = 0; i < count; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(FIRST_AVATAR_ID, LAST_AVATAR_ID) + '.svg',
      message: commentSamples[i],
      name: getRandomArrayItem(USER_NAMES)
    });
  }

  return comments;
};

/**
 * Сгенерировать случайные фотографии
 *
 * @param {number} count Количество фотографий
 * @return {array} Массив фотографий
 */
var getRandomPhotos = function (count) {
  var photos = [];

  for (var i = 0; i < count; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: getRandomArrayItem(PHOTOS_DESCTIPTIONS),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getRandomComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
    });
  }

  return photos;
};

/**
 * Создает DOM елемент фотографии
 *
 * @param {Object} photo Объект описывающий фотографию
 * @return {HTMLElement} Созданный DOM элемент фотографии
 */
var getPhotoElement = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

/**
 * Собирает массив DOM елементов фотографий
 *
 * @param {Object[]} photos Массив объектов описывабщих фотографии
 * @return {HTMLElement[]} Массив DOM елементов фотографий
 */
var getPhotoElements = function (photos) {
  var photoElements = [];

  for (var i = 0; i < photos.length; i++) {
    photoElements.push(getPhotoElement(photos[i]));
  }

  return photoElements;
};

/**
 * Вставляет DOM элементы из массива в другой DOM элемент
 * @param {HTMLElement[]} elements Элементы которые будут вставлены
 * @param {HTMLElement} parentElement Элемент в который будет выполняться вставка
 */
var insertElements = function (elements, parentElement) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }

  parentElement.appendChild(fragment);
};

var photos = getRandomPhotos(PHOTOS_COUNT);
var photoElements = getPhotoElements(photos);
insertElements(photoElements, photoListElement);
