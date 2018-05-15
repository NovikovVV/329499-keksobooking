'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

  var getHalf = function (value) {
    return value / 2;
  };

  var setFormInputsDisableState = function (form, boolean) {
    var elements = Array.from(form.elements);
    elements.forEach(function (it) {
      it.disabled = boolean;
    });
  };

  var debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_TIMEOUT);
  };

  var checkPopupPresence = function () {
    return !!document.querySelector('.popup');
  };

  var checkPinsPresense = function () {
    return !!document.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  window.util = {
    getHalf: getHalf,
    setFormInputsDisableState: setFormInputsDisableState,
    debounce: debounce,
    checkPopupPresence: checkPopupPresence,
    checkPinsPresense: checkPinsPresense
  };
})();
