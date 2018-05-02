'use strict';

(function () {
  var MAIN_PIN = {
    width: 65,
    height: 82,
    x: 570,
    y: 375
  };
  var mainPinElement = document.querySelector('.map__pin--main');
  var cssUnits = 'px';
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputNumberOfRooms = document.querySelector('#room_number');
  var inputRoomType = document.querySelector('#type');
  var errorPopup = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');

  var getOffsetRect = function (elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop + 40;
    var left = box.left + scrollLeft - clientLeft - map.getBoundingClientRect().left;
    return {x: Math.round(left), y: Math.round(top)};
  };

  var addMapPinClickListener = function (pins, objects, i) {
    var pin = pins[i];
    var object = objects[i];
    var onMapPinClick = function () {
      if (map.children.length < 3) {
        window.createAdCard(object);
      } else if (map.children.length === 3) {
        map.removeChild(map.children[1]);
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
    window.form.setAddressValue(MAIN_PIN.x + Math.round(window.util.getHalf(MAIN_PIN.width)), MAIN_PIN.y + MAIN_PIN.height);
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
      top: map.getBoundingClientRect().top,
      right: map.getBoundingClientRect().right,
      bottom: map.getBoundingClientRect().bottom,
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

      window.form.setAddressValue(getOffsetRect(mainPinElement).x + Math.round(window.util.getHalf(MAIN_PIN.width)), getOffsetRect(mainPinElement).y + window.util.getHalf(MAIN_PIN.height));
      document.removeEventListener('mousemove', onMainPinDragStart);
      document.removeEventListener('mousedown', onMainPinDragEnd);
    };

    document.addEventListener('mousemove', onMainPinDragStart);
    document.addEventListener('mouseup', onMainPinDragEnd);
  };

  window.util.setFieldsetsDisableState(true);
  window.form.setAddressValue(MAIN_PIN.x + Math.round(window.util.getHalf(MAIN_PIN.width)), MAIN_PIN.y + window.util.getHalf(MAIN_PIN.height));
  mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
  mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
})();
