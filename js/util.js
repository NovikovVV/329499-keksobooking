'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

  window.util = {
    getHalf: function (value) {
      return value / 2;
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
      return !!document.querySelector('.popup');
    }
  };
})();
