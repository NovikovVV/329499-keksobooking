'use strict';

(function () {
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
    }
  };
})();
