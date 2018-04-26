'use strict';

(function () {
  var inputAddress = document.querySelector('input[name="address"]');
  var inputRoomType = document.querySelector('#type');
  var inputRoomPrice = document.querySelector('#price');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputNumberOfRooms = document.querySelector('#room_number');
  var inputGuestsCapacity = document.querySelector('#capacity');

  window.form = {
    setFieldsetsDisableState: function (boolean) {
      var fieldsets = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = boolean;
      }
    },
    onTimeInInputClick: function () {
      var time = inputTimeIn.value;
      inputTimeOut.value = time;
    },
    onTimeOutInputClick: function () {
      var time = inputTimeOut.value;
      inputTimeIn.value = time;
    },
    onInputRoomTypeClick: function () {
      switch (inputRoomType.value) {
        case 'flat':
          inputRoomPrice.placeholder = 1000;
          inputRoomPrice.min = 1000;
          break;
        case 'bungalo':
          inputRoomPrice.placeholder = 0;
          inputRoomPrice.min = 0;
          break;
        case 'house':
          inputRoomPrice.placeholder = 5000;
          inputRoomPrice.min = 5000;
          break;
        case 'palace':
          inputRoomPrice.placeholder = 10000;
          inputRoomPrice.min = 10000;
      }
    },
    setNumberOfGuests: function () {
      for (var i = 0; i < inputGuestsCapacity.length; i++) {
        inputGuestsCapacity[i].disabled = true;
        if (inputNumberOfRooms.value === '100' && inputGuestsCapacity[i].value === '0') {
          inputGuestsCapacity[i].selected = true;
          inputGuestsCapacity[i].disabled = false;
        } else if (inputNumberOfRooms.value !== '100' && inputGuestsCapacity[i].value !== '0' && inputGuestsCapacity[i].value <= inputNumberOfRooms.value) {
          inputGuestsCapacity[i].selected = true;
          inputGuestsCapacity[i].disabled = false;
        }
      }
    },
    setAddressValue: function (x, y) {
      inputAddress.value = +x + ', ' + +y;
    }
  };
})();
