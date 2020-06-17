'use strict';

var USER_NAMES = ['Иван', 'Петро', 'Васо', 'Колян', 'Ева', 'Мария', 'Антуаннета'];
var ALL_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NUMBER_OF_PHOTOS = 25;
var NUMBER_OF_AVATARS = 6;
var AVATAR_ARRAY = [];
var PHOTO_NUMBERS = [];
var likesNumber = 0;


//функция для генерации массивов для ссылок
var getPhotoNumbers = function (urlNunmber, array) {
  for (var i = 0; i < urlNunmber; i++) {
    array[i] = i + 1;
  }
};

getPhotoNumbers(NUMBER_OF_PHOTOS, PHOTO_NUMBERS);
getPhotoNumbers(NUMBER_OF_AVATARS, AVATAR_ARRAY);

// добавил генерацию случайного айтема из массива
var getRandomItem = function (array) {
  var randomItem = (Math.floor(Math.random() * array.length));
  return (array[randomItem]);
};


//добавил генерацию лайков
var getRandomLikes = function (min, max) {
  return (Math.floor(Math.random() * (max - min)) + min);
};

//добавил генерацию комментов
var getRandomComments = function (min, max) {
  return (Math.floor(Math.random() * (max - min)) + min);
};
//генерация массива комментов для фотографии
var commentsArray = [];
var getCommentsArray = function () {
  for (var i = 0; i < getRandomComments(1, 7); i++) {
    var userPicture = 'img/avatar-' + AVATAR_ARRAY[i] + '.jpg';
    var userRandomName = getRandomItem(USER_NAMES);
    var userRandomMessage = getRandomItem(ALL_COMMENTS);
    var userComment = {
      avatar: userPicture,
      message: userRandomMessage,
      name: userRandomName,
    };
    commentsArray[i] = userComment;
  }
};


var usersPhotoList = document.querySelector('.pictures');
var userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

//функция создания 25 объектов
var photoArray = [];
var getPhotoArray = function () {
  for (var i = 0; i < PHOTO_NUMBERS.length; i++) {
    getCommentsArray();
    var photoURL = 'photos/' + PHOTO_NUMBERS[i] + '.jpg'; // ссылка не добавляется???
    var photoDescription = 'фото';
    likesNumber = getRandomLikes(15, 200);
    var usersComments = commentsArray.length;
    var usersPhoto = {
      url: photoURL,
      description: photoDescription,
      likes: likesNumber,
      comments: usersComments,
    };
    photoArray[i] = usersPhoto;
  }
  console.log(commentsArray);
};
getPhotoArray();

//собираю DOM ниже поиск элеменотов в доме

var renderPhoto = function (photo) {
  var pictureElement = userPhotoTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photoArray.length; i++) {
  fragment.appendChild(renderPhoto(photoArray[i]));
}

usersPhotoList.appendChild(fragment);


