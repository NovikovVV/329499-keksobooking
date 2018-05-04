'use strict';

(function () {
  var MAP_PIN_X_OFFSET = 25;
  var MAP_PIN_Y_OFFSET = 70;
  var pinsArea = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var cssUnits = 'px';

  window.pins = {
    create: function (ads) {
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
