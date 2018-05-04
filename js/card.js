'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var priceUnits = '₽/ночь';
  var valueWithPopup = 3;
  var adCardIndex = 1;

  var onAdCardCloseClick = function () {
    if (map.children.length >= valueWithPopup) {
      map.removeChild(map.children[adCardIndex]);
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE && map.children.length >= valueWithPopup) {
      map.removeChild(map.children[adCardIndex]);
    }
  };

  window.createAdCard = function (ad) {
    var adCard = mapCardTemplate.cloneNode(true);
    var adCardClose = adCard.querySelector('.popup__close');
    var adCardTitle = adCard.querySelector('.popup__title');
    var adCardAddress = adCard.querySelector('.popup__text--address');
    var adCardPrice = adCard.querySelector('.popup__text--price');
    var adCardRoomType = adCard.querySelector('.popup__type');
    var adCardCapacity = adCard.querySelector('.popup__text--capacity');
    var adCardTimes = adCard.querySelector('.popup__text--time');
    var adCardFeatures = adCard.querySelector('.popup__features');
    var adCardDescription = adCard.querySelector('.popup__description');
    var adCardPhotos = adCard.querySelector('.popup__photos');
    var adCardAvatar = adCard.querySelector('.popup__avatar');

    var setAdCardFeatures = function () {
      var featureTemplate = adCardFeatures.querySelector('.popup__feature');
      var fragment = document.createDocumentFragment();
      var secondClassIndex = 1;

      while (adCardFeatures.firstChild) {
        adCardFeatures.removeChild(adCardFeatures.firstChild);
      }

      featureTemplate.classList.remove(featureTemplate.classList[secondClassIndex]);
      for (var i = 0; i < ad.offer.features.length; i++) {
        var featureItem = featureTemplate.cloneNode(true);
        featureItem.classList.add('popup__feature--' + ad.offer.features[i]);
        fragment.appendChild(featureItem);
      }

      adCardFeatures.appendChild(fragment);
    };

    var setAdCardPhoto = function () {
      var photoTemplate = adCardPhotos.querySelector('img');
      var fragment = document.createDocumentFragment();

      while (adCardPhotos.firstChild) {
        adCardPhotos.removeChild(adCardPhotos.firstChild);
      }

      for (var i = 0; i < ad.offer.photos.length; i++) {
        var photoItem = photoTemplate.cloneNode(true);
        photoItem.src = ad.offer.photos[i];
        fragment.appendChild(photoItem);
      }

      adCardPhotos.appendChild(fragment);
    };

    switch (ad.offer.type) {
      case 'flat': adCardRoomType.textContent = 'Квартира';
        break;
      case 'bungalo': adCardRoomType.textContent = 'Бунгало';
        break;
      case 'house': adCardRoomType.textContent = 'Домик';
        break;
      case 'palace': adCardRoomType.textContent = 'Дворец';
    }

    adCardTitle.textContent = ad.offer.title;
    adCardAddress.textContent = ad.offer.address;
    adCardPrice.textContent = ad.offer.price + priceUnits;
    adCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
    adCardTimes.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд после ' + ad.offer.checkout;
    adCardDescription.textContent = ad.offer.description;
    adCardFeatures = setAdCardFeatures(ad);
    adCardPhotos = setAdCardPhoto(ad);
    adCardAvatar.src = ad.author.avatar;
    adCardClose.addEventListener('click', onAdCardCloseClick);
    map.insertBefore(adCard, mapFiltersContainer);
    document.addEventListener('keydown', onEscPress);
  };
})();
