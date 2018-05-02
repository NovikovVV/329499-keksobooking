'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStartX = 603;
  var mainPinStartY = 416;
  var cssUnits = 'px';
  var inputAddress = document.querySelector('input[name="address"]');

  window.util = {
    getHalf: function (value) {
      return value / 2;
    },
    getRandomNumberInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffle: function (array) {
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
    },
    getRandomElement: function (array) {
      var element = array[Math.floor(Math.random() * array.length)];
      return element;
    },
    setFieldsetsDisableState: function (boolean) {
      var fieldsets = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = boolean;
      }
    },
    reset: function () {
      mainPin.style.top = mainPinStartY + cssUnits;
      mainPin.style.left = mainPinStartX + cssUnits;
      inputAddress.value = mainPinStartX + ', ' + mainPinStartY;
      map.classList.add('map--faded');
      mainForm.classList.add('ad-form--disabled');
    }
  };
})();
