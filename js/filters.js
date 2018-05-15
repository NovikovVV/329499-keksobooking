'use strict';

(function () {
  var HIGH_PRICE = 50000;
  var MIN_PRICE = 10000;
  var ANY = 'any';
  var filtersForm = document.querySelector('.map__filters');
  var typeFilter = filtersForm.querySelector('#housing-type');
  var priceFilter = filtersForm.querySelector('#housing-price');
  var roomsFilter = filtersForm.querySelector('#housing-rooms');
  var guestsFilter = filtersForm.querySelector('#housing-guests');

  var checkPrice = function (price, priceType) {
    switch (priceType) {
      case 'low':
        if (price < MIN_PRICE) {
          return true;
        }
        break;
      case 'middle':
        if (price >= MIN_PRICE && price < HIGH_PRICE) {
          return true;
        }
        break;
      case 'high':
        if (price >= HIGH_PRICE) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  };

  var filterCheckBoxes = function (ad) {
    var selectedCheckBoxes = filtersForm.querySelectorAll('input[type=checkbox]:checked');
    var filtered = true;
    if (selectedCheckBoxes.length) {
      selectedCheckBoxes.forEach(function (checkBox) {
        if (!ad.offer.features.includes(checkBox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

  var filterAd = function (ad) {
    return (
      (typeFilter.value === ANY ? ad : ad.offer.type === typeFilter.value) &&
      (priceFilter.value === ANY ? ad : checkPrice(ad.offer.price, priceFilter.value)) &&
      (roomsFilter.value === ANY ? ad : ad.offer.rooms === +roomsFilter.value) &&
      (guestsFilter.value === ANY ? ad : ad.offer.guests === +guestsFilter.value) &&
      filterCheckBoxes(ad)
    );
  };

  window.filterOffers = function () {
    var filteredAds = window.collection.filter(filterAd);
    if (window.util.checkPopupPresence()) {
      window.card.close();
    }
    window.pins.remove();
    window.pins.create(filteredAds);
  };
})();
