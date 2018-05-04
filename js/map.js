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
  var pinsArea = document.querySelector('.map__pins');
  var mainForm = document.querySelector('.ad-form');
  var inputAddress = document.querySelector('input[name="address"]');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputNumberOfRooms = document.querySelector('#room_number');
  var inputRoomType = document.querySelector('#type');
  var errorPopup = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');

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

  var addMapPinClickListener = function (pins, objects, i) {
    var valueWithPopup = 3;
    var adCardIndex = 1;
    var pin = pins[i];
    var object = objects[i];
    var onMapPinClick = function () {
      if (map.children.length < valueWithPopup) {
        window.createAdCard(object);
      } else if (map.children.length === valueWithPopup) {
        map.removeChild(map.children[adCardIndex]);
        window.createAdCard(object);
      }
    };
    pin.addEventListener('click', onMapPinClick);
  };

  var onSuccess = function (data) {
    var collection = data;
    window.pins.create(data);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      addMapPinClickListener(mapPins, collection, i);
    }
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
    mainForm.classList.remove('ad-form--disabled');
    window.util.setFieldsetsDisableState(false);
    inputRoomType.addEventListener('click', window.form.onInputRoomTypeClick);
    inputTimeIn.addEventListener('click', window.form.onTimeInInputClick);
    inputTimeOut.addEventListener('click', window.form.onTimeOutInputClick);
    inputNumberOfRooms.addEventListener('click', window.form.setNumberOfGuests);

    window.backend.load(onSuccess, onError);
    map.classList.remove('map--faded');
    mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var onMainPinMouseDown = function (evtDown) {
    evtDown.preventDefault();
    var startCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var mapBorder = {
      top: 150,
      right: map.getBoundingClientRect().right,
      bottom: 500,
      left: map.getBoundingClientRect().left
    };

    var onMainPinDragStart = function (evtMove) {
      evtMove.preventDefault();

      var offset = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords.x = evtMove.clientX;
      startCoords.y = evtMove.clientY;
      if (evtMove.clientX > mapBorder.left && evtMove.clientX < mapBorder.right && evtMove.clientY > mapBorder.top && evtMove.clientY < mapBorder.bottom) {
        mainPinElement.style.top = (mainPinElement.offsetTop - offset.y) + cssUnits;
        mainPinElement.style.left = (mainPinElement.offsetLeft - offset.x) + cssUnits;
      }
    };

    var onMainPinDragEnd = function (evtEnd) {
      evtEnd.preventDefault();

      inputAddress.value = getMainPinCoords();
      document.removeEventListener('mousemove', onMainPinDragStart);
      document.removeEventListener('mousedown', onMainPinDragEnd);
    };

    document.addEventListener('mousemove', onMainPinDragStart);
    document.addEventListener('mouseup', onMainPinDragEnd);
  };

  inputAddress.value = getMainPinCoords();
  window.util.setFieldsetsDisableState(true);
  mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
  mainPinElement.addEventListener('mouseup', onMainPinMouseUp);

  window.resetPage = function () {
    var adCardIndex = 1;
    var valueWithPopup = 3;
    var valueWithoutPins = 2;

    map.classList.add('map--faded');
    mainForm.reset();
    mainForm.classList.add('ad-form--disabled');
    window.util.setFieldsetsDisableState(true);
    mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    mainPinElement.addEventListener('mouseup', onMainPinMouseUp);

    mainPinElement.style.top = MAIN_PIN.y + cssUnits;
    mainPinElement.style.left = MAIN_PIN.x + cssUnits;

    if (map.children.length === valueWithPopup) {
      map.removeChild(map.children[adCardIndex]);
    }

    if (pinsArea.children.length > valueWithoutPins) {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPins.length; i++) {
        pinsArea.removeChild(mapPins[i]);
      }
    }
  };
})();
