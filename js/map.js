'use strict';

var NUMBER_OF_ADS = 8;
var X_START = 300;
var X_END = 900;
var Y_START = 150;
var Y_END = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
var MAP_PIN_X_OFFSET = 25;
var MAP_PIN_Y_OFFSET = 70;
var ROOM_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var ROOM_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var ROOM_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var ROOM_PHOTO = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var units = 'px';
var priceUnits = '₽/ночь';
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinsArea = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffle = function (array) {
  var i = 0;
  var j = 0;
  var temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var getRandomElement = function (array) {
  var element = array[Math.floor(Math.random() * array.length)];

  return element;
};

var setRoomFeatures = function () {
  var roomFeatures = shuffle(ROOM_FEATURES.slice());
  roomFeatures.length = getRandomNumberInRange(0, roomFeatures.length);

  return roomFeatures;
};

var createAds = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    var offer = {
      title: ROOM_TITLES[i],
      address: getRandomNumberInRange(X_START, X_END) + ', ' + getRandomNumberInRange(Y_START, Y_END),
      price: getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(ROOM_TYPES),
      rooms: getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: setRoomFeatures(),
      description: '',
      photos: shuffle(ROOM_PHOTO.slice())
    };

    var location = {
      x: offer.address.slice(0, 3),
      y: offer.address.slice(5, 8)
    };

    var ad = {};
    ad.author = author;
    ad.offer = offer;
    ad.location = location;

    ads[i] = ad;
  }

  return ads;
};

var createMapPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPinImg.alt = ads[i].offer.title;
    mapPinImg.src = ads[i].author.avatar;
    mapPin.style.left = ads[i].location.x - MAP_PIN_X_OFFSET + units;
    mapPin.style.top = ads[i].location.y - MAP_PIN_Y_OFFSET + units;

    fragment.appendChild(mapPin);
  }

  pinsArea.appendChild(fragment);
};

var createAdCard = function (ads) {
  var adCard = mapCardTemplate.cloneNode(true);
  var adCardTitle = adCard.querySelector('.popup__title');
  var adCardAddress = adCard.querySelector('.popup__text--address');
  var adCardPrice = adCard.querySelector('.popup__text--price');
  var adCardRoomType = adCard.querySelector('.popup__type');
  var adCardCapacity = adCard.querySelector('.popup__text--capacity');
  var adCardTimes = adCard.querySelector('.popup__text--time');
  var adCardFeatures = adCard.querySelector('.popup__features');
  var adCardDescription = adCard.querySelector('.popup__description');
  var adCardPhotos = adCard.querySelector('.popup__photos');
  var adCardAvatar = adCard.querySelector('.popup__avatar');

  var setAdCardFeatures = function () {
    var featureTemplate = adCardFeatures.querySelector('.popup__feature');
    var fragment = document.createDocumentFragment();

    while (adCardFeatures.firstChild) {
      adCardFeatures.removeChild(adCardFeatures.firstChild);
    }

    featureTemplate.classList.remove(featureTemplate.classList[1]);
    for (var i = 0; i < ads[0].offer.features.length; i++) {
      var featureItem = featureTemplate.cloneNode(true);
      featureItem.classList.add('popup__feature--' + ads[0].offer.features[i]);
      fragment.appendChild(featureItem);
    }

    adCardFeatures.appendChild(fragment);
  };

  var setAdPhoto = function () {
    var photoTemplate = adCardPhotos.querySelector('img');
    var fragment = document.createDocumentFragment();

    while (adCardPhotos.firstChild) {
      adCardPhotos.removeChild(adCardPhotos.firstChild);
    }

    for (var i = 0; i < ads[0].offer.photos.length; i++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.src = ads[0].offer.photos[i];
      fragment.appendChild(photoItem);
    }

    adCardPhotos.appendChild(fragment);
  };

  switch (ads[0].offer.type) {
    case 'flat': adCardRoomType.textContent = 'Квартира';
      break;
    case 'bungalo': adCardRoomType.textContent = 'Бунгало';
      break;
    case 'house': adCardRoomType.textContent = 'Домик';
      break;
    case 'palace': adCardRoomType.textContent = 'Дворец';
  }

  adCardTitle.textContent = ads[0].offer.title;
  adCardAddress.textContent = ads[0].offer.address;
  adCardPrice.textContent = ads[0].offer.price + priceUnits;
  adCardCapacity.textContent = ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей.';
  adCardTimes.textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд после ' + ads[0].offer.checkout;
  adCardDescription.textContent = ads[0].offer.description;
  adCardFeatures = setAdCardFeatures(ads);
  adCardPhotos = setAdPhoto(ads);
  adCardAvatar.src = ads[0].author.avatar;

  map.insertBefore(adCard, mapFiltersContainer);
};

var adsCollection = createAds(NUMBER_OF_ADS);
createMapPins(adsCollection);
createAdCard(adsCollection);
map.classList.remove('map--faded');
