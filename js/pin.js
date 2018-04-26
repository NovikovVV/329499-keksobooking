'use strict';

(function () {
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
  var ROOM_PHOTO = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var ROOM_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var pinsArea = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var cssUnits = 'px';

  window.pin = {
    setRoomFeatures: function () {
      var roomFeatures = window.util.shuffle(ROOM_FEATURES.slice());
      roomFeatures.length = window.util.getRandomNumberInRange(0, roomFeatures.length);
      return roomFeatures;
    },
    createAds: function (quantity) {
      var ads = [];
      for (var i = 0; i < quantity; i++) {
        var author = {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        };

        var offer = {
          title: ROOM_TITLES[i],
          address: window.util.getRandomNumberInRange(X_START, X_END) + ', ' + window.util.getRandomNumberInRange(Y_START, Y_END),
          price: window.util.getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
          type: window.util.getRandomElement(ROOM_TYPES),
          rooms: window.util.getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
          guests: window.util.getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
          checkin: window.util.getRandomElement(TIMES),
          checkout: window.util.getRandomElement(TIMES),
          features: this.setRoomFeatures(),
          description: '',
          photos: window.util.shuffle(ROOM_PHOTO.slice())
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
    },
    createMapPins: function (ads) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var mapPin = mapPinTemplate.cloneNode(true);
        var mapPinImg = mapPin.querySelector('img');

        mapPinImg.alt = ads[i].offer.title;
        mapPinImg.src = ads[i].author.avatar;
        mapPin.style.left = ads[i].location.x - MAP_PIN_X_OFFSET + cssUnits;
        mapPin.style.top = ads[i].location.y - MAP_PIN_Y_OFFSET + cssUnits;

        fragment.appendChild(mapPin);
      }

      pinsArea.appendChild(fragment);
    }
  };
})();
