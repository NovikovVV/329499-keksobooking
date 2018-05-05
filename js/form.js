'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var successPopup = document.querySelector('.success');
  var successButton = document.querySelector('.success__button');
  var errorPopup = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');
  var resetButton = document.querySelector('.ad-form__reset');
  var inputRoomType = document.querySelector('#type');
  var inputRoomPrice = document.querySelector('#price');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var inputNumberOfRooms = document.querySelector('#room_number');
  var inputGuestsCapacity = document.querySelector('#capacity');
  var roomPriceMap = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var onMainFormSuccess = function () {
    window.resetPage();
    successPopup.classList.remove('hidden');
    successButton.addEventListener('click', function () {
      successPopup.classList.add('hidden');
    });

  };

  var onMainFormError = function (errorMessage) {
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

  var onMainFormSubmit = function (evt) {
    window.backend.save(new FormData(mainForm), onMainFormSuccess, onMainFormError);
    evt.preventDefault();
  };

  mainForm.addEventListener('submit', onMainFormSubmit);
  resetButton.addEventListener('click', window.resetPage);

  window.form = {
    onTimeInInputClick: function () {
      var time = inputTimeIn.value;
      inputTimeOut.value = time;
    },
    onTimeOutInputClick: function () {
      var time = inputTimeOut.value;
      inputTimeIn.value = time;
    },
    onInputRoomTypeClick: function () {
      var value = inputRoomType.value;
      inputRoomPrice.placeholder = roomPriceMap[value];
      inputRoomPrice.min = roomPriceMap[value];
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
    }
  };
})();
