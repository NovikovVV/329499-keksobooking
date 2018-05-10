'use strict';

(function () {
  var FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var roomPhotoChooser = document.querySelector('#images');
  var roomPhotoContainer = document.querySelector('.ad-form__photo-container');
  var defaultAvatar = 'img/muffin-grey.svg';
  var firstFileIndex = 0;

  var onInputTypeFileChange = function (evt) {
    var file = evt.target.files[firstFileIndex];
    var fileName = file.name.toLowerCase();

    var matches = FILE_EXTENSIONS.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === roomPhotoChooser) {
          roomPhotoContainer.appendChild(window.photo.add(reader));
          return;
        }
        avatarPreview.src = reader.result;
      });
    }

    reader.readAsDataURL(file);
  };

  window.photo = {
    add: function (reader) {
      var photoContainer = document.createElement('div');
      var photo = document.createElement('img');

      photo.src = reader.result;
      photo.width = 70;
      photo.height = 70;

      photoContainer.classList.add('ad-form__photo');
      photoContainer.appendChild(photo);

      return photoContainer;
    },
    delete: function () {
      avatarPreview.src = defaultAvatar;

      var photos = Array.from(document.querySelectorAll('.ad-form__photo'));
      photos.forEach(function (it) {
        roomPhotoContainer.removeChild(it);
      });
    }
  };

  avatarChooser.addEventListener('change', onInputTypeFileChange);
  roomPhotoChooser.addEventListener('change', onInputTypeFileChange);
})();
