'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;
  var MAP_PIN_X_OFFSET = 25;
  var MAP_PIN_Y_OFFSET = 70;
  var pinsArea = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var cssUnits = 'px';

  var addPinListener = function (element, ad) {
    element.addEventListener('click', function () {
      if (!window.util.checkPopupPresence()) {
        window.card.create(ad);
      } else {
        window.card.close();
        window.card.create(ad);
      }
    });
  };

  var create = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length && i < MAX_NUMBER_OF_PINS; i++) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var mapPinImg = mapPin.querySelector('img');

      mapPinImg.alt = ads[i].offer.title;
      mapPinImg.src = ads[i].author.avatar;
      mapPin.style.left = ads[i].location.x - MAP_PIN_X_OFFSET + cssUnits;
      mapPin.style.top = ads[i].location.y - MAP_PIN_Y_OFFSET + cssUnits;
      addPinListener(mapPin, ads[i]);

      fragment.appendChild(mapPin);
    }
    pinsArea.appendChild(fragment);
  };

  var remove = function () {
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (it) {
      pinsArea.removeChild(it);
    });
  };

  window.pins = {
    create: create,
    remove: remove
  };
})();
