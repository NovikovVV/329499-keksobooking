'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

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
    setFormInputsState: function (form, boolean) {
      var elements = Array.from(form.elements);
      elements.forEach(function (it) {
        it.disabled = boolean;
      });
    },
    debounce: function (func) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_TIMEOUT);
    },
    checkPopupPresence: function () {
      var popup = document.querySelector('.popup');
      return popup ? true : false;
    }
  };
})();
