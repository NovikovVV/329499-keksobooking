'use strict';

(function () {
  var MAIN_PIN = {
    width: 65,
    height: 80,
    x: 570,
    y: 375
  };
  var mainPinElement = document.querySelector('.map__pin--main');
  var cssUnits = 'px';
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var filters = document.querySelector('.map__filters');
  var inputAddress = document.querySelector('input[name="address"]');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputNumberOfRooms = document.querySelector('#room_number');
  var inputRoomType = document.querySelector('#type');
  var errorPopup = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');
  var mapBorders = {
    top: 150,
    right: map.getBoundingClientRect().right,
    bottom: 500,
    left: map.getBoundingClientRect().left
  };

  var getMainPinCoords = function () {
    var mapPosition = map.getBoundingClientRect();
    var mainPinPosition = mainPinElement.getBoundingClientRect();
    var mainPinCoords = {
      x: mainPinPosition.left - mapPosition.left,
      y: mainPinPosition.top - mapPosition.top
    };
    var offsetX = Math.round(window.util.getHalf(MAIN_PIN.width));
    var offsetY = MAIN_PIN.height;

    if (map.classList.contains('map--faded')) {
      offsetX = Math.round(window.util.getHalf(MAIN_PIN.width));
      offsetY = Math.round(window.util.getHalf(MAIN_PIN.height));
      return +(mainPinCoords.x + offsetX) + ', ' + +(mainPinCoords.y + offsetY);
    }
    return +(mainPinCoords.x + offsetX) + ', ' + +(mainPinCoords.y + offsetY);
  };

  var onSuccess = function (data) {
    window.collection = data;
    window.pins.create(data);
    window.filterOffers();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('p');
    node.classList.add('error__status');
    node.style.fontSize = '50px';
    node.style.color = '#fff';
    node.textContent = errorMessage;
    errorPopup.insertBefore(node, errorButton);

    errorPopup.classList.remove('hidden');
    errorButton.addEventListener('click', function () {
      errorPopup.classList.add('hidden');
      errorPopup.removeChild(node);
    });
  };

  var onMainPinMouseUp = function () {
    window.map.enable();
  };

  var onMainPinMouseDown = function (evtDown) {
    evtDown.preventDefault();

    var startCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var onMainPinDragStart = function (evtMove) {
      evtMove.preventDefault();

      if (map.classList.contains('map--faded')) {
        window.map.enable();
      }

      var offset = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords.x = evtMove.clientX;
      startCoords.y = evtMove.clientY;

      if (evtMove.pageY > mapBorders.top && evtMove.pageY < mapBorders.bottom) {
        mainPinElement.style.top = (mainPinElement.offsetTop - offset.y) + cssUnits;
      }
      if (startCoords.x > mapBorders.left && startCoords.x < mapBorders.right) {
        mainPinElement.style.left = (mainPinElement.offsetLeft - offset.x) + cssUnits;
      }

      inputAddress.value = getMainPinCoords();
    };

    var onMainPinDragEnd = function (evtEnd) {
      evtEnd.preventDefault();

      document.removeEventListener('mousemove', onMainPinDragStart);
      document.removeEventListener('mouseup', onMainPinDragEnd);
    };

    document.addEventListener('mousemove', onMainPinDragStart);
    document.addEventListener('mouseup', onMainPinDragEnd);
  };

  var setStartingState = function () {
    window.util.setFormInputsDisableState(mainForm, true);
    window.util.setFormInputsDisableState(filters, true);
    inputAddress.value = getMainPinCoords();
    mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
  };

  var enable = function () {
    mainForm.classList.remove('ad-form--disabled');
    window.util.setFormInputsDisableState(mainForm, false);
    window.util.setFormInputsDisableState(filters, false);
    inputRoomType.addEventListener('change', window.form.onInputRoomTypeChange);
    inputTimeIn.addEventListener('change', window.form.onTimeInInputChange);
    inputTimeOut.addEventListener('change', window.form.onTimeOutInputChange);
    inputNumberOfRooms.addEventListener('change', window.form.setNumberOfGuests);

    window.backend.load(onSuccess, onError);
    map.classList.remove('map--faded');
    inputAddress.value = getMainPinCoords();
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);

    var filtersContainer = document.querySelector('.map__filters');
    filtersContainer.addEventListener('change', function () {
      window.util.debounce(window.filterOffers);
    });
  };

  var reset = function () {
    window.photo.remove();
    map.classList.add('map--faded');
    mainForm.reset();
    filters.reset();
    mainForm.classList.add('ad-form--disabled');
    mainPinElement.style.top = MAIN_PIN.y + cssUnits;
    mainPinElement.style.left = MAIN_PIN.x + cssUnits;

    setStartingState();

    if (window.util.checkPopupPresence()) {
      window.card.close();
    }

    if (window.util.checkPinsPresense()) {
      window.pins.remove();
    }
  };

  setStartingState();

  window.map = {
    enable: enable,
    reset: reset
  };
})();
