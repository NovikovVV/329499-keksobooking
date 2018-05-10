'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var priceUnits = '₽/ночь';

  var onAdCardCloseClick = function () {
    if (window.util.checkPopupPresence()) {
      window.card.close();
    }
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE && window.util.checkPopupPresence()) {
      window.card.close();
    }
  };

  window.card = {
    create: function (ad) {
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
      var roomTypesMap = {
        'flat': 'Квартира',
        'bungalo': 'Бунгало',
        'house': 'Домик',
        'palace': 'Дворец'
      };

      var setAdCardFeatures = function () {
        if (ad.offer.features.length === 0) {
          adCard.removeChild(adCardFeatures);
          return;
        }

        var featureTemplate = adCardFeatures.querySelector('.popup__feature');
        var fragment = document.createDocumentFragment();
        var secondClassIndex = 1;

        while (adCardFeatures.firstChild) {
          adCardFeatures.removeChild(adCardFeatures.firstChild);
        }

        featureTemplate.classList.remove(featureTemplate.classList[secondClassIndex]);
        ad.offer.features.forEach(function (it) {
          var featureItem = featureTemplate.cloneNode(true);
          featureItem.classList.add('popup__feature--' + it);
          fragment.appendChild(featureItem);
        });
        adCardFeatures.appendChild(fragment);
      };

      var setAdCardPhoto = function () {
        if (ad.offer.photos.length === 0) {
          adCard.removeChild(adCardPhotos);
          return;
        }

        var photoTemplate = adCardPhotos.querySelector('img');
        var fragment = document.createDocumentFragment();

        while (adCardPhotos.firstChild) {
          adCardPhotos.removeChild(adCardPhotos.firstChild);
        }

        ad.offer.photos.forEach(function (it) {
          var photoItem = photoTemplate.cloneNode(true);
          photoItem.src = it;
          fragment.appendChild(photoItem);
        });

        adCardPhotos.appendChild(fragment);
      };

      adCardRoomType.textContent = roomTypesMap[ad.offer.type];
      adCardTitle.textContent = ad.offer.title;
      adCardAddress.textContent = ad.offer.address;
      adCardPrice.textContent = ad.offer.price + priceUnits;
      adCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
      adCardTimes.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд после ' + ad.offer.checkout;
      adCardDescription.textContent = ad.offer.description;
      adCardFeatures = setAdCardFeatures();
      adCardPhotos = setAdCardPhoto();
      adCardAvatar.src = ad.author.avatar;
      adCardClose.addEventListener('click', onAdCardCloseClick);
      map.insertBefore(adCard, mapFiltersContainer);
      document.addEventListener('keydown', onEscPress);
    },
    close: function () {
      var popup = document.querySelector('.popup');
      map.removeChild(popup);
      document.removeEventListener('keydown', onEscPress);
    }
  };
})();
