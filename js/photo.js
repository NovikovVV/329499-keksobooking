'use strict';

(function () {
  var FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var roomPhotoChooser = document.querySelector('#images');
  var roomPhotoContainer = document.querySelector('.ad-form__photo-list');
  var photoList = document.querySelector('.ad-form__photo-list');
  var defaultAvatar = 'img/muffin-grey.svg';
  var firstFileIndex = 0;
  var draggedNode = null;
  var replaceNode = null;
  var draggedNodeSibling = null;

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
          photoList.appendChild(window.photo.add(reader));
          return;
        }
        avatarPreview.src = reader.result;
      });
    }

    reader.readAsDataURL(file);
  };

  var onPhotoListDragOver = function (evtOver) {
    evtOver.preventDefault();
    return false;
  };

  var onRoomPhotoDragStart = function (evtStart) {
    if (evtStart.target.tagName.toLowerCase() === 'img') {
      draggedNode = evtStart.target.parentNode;
      draggedNodeSibling = draggedNode.nextSibling;

      evtStart.dataTransfer.effectAllowed = 'move';
      evtStart.dataTransfer.setData('text/plain', draggedNode);
    }
  };

  var onRoomPhotoDragEnter = function (evtEnter) {
    if (evtEnter.target !== draggedNode) {
      replaceNode = evtEnter.target.parentNode;
    }
  };

  var onRoomPhotoDragEnd = function () {
    if (replaceNode !== null) {
      if (draggedNodeSibling === replaceNode) {
        photoList.insertBefore(draggedNode, replaceNode.nextSibling);
        draggedNode = null;
        replaceNode = null;
        return;
      }

      var swap = photoList.replaceChild(draggedNode, replaceNode);
      photoList.insertBefore(swap, draggedNodeSibling);
      draggedNode = null;
      replaceNode = null;
    }
  };

  var add = function (reader) {
    var photoContainer = document.createElement('li');
    var photo = document.createElement('img');

    photo.src = reader.result;
    photo.width = 70;
    photo.height = 70;

    photoContainer.classList.add('ad-form__photo');
    photoContainer.draggable = true;
    photoContainer.appendChild(photo);

    photoContainer.addEventListener('dragstart', onRoomPhotoDragStart);
    photoContainer.addEventListener('dragenter', onRoomPhotoDragEnter);
    photoContainer.addEventListener('dragend', onRoomPhotoDragEnd);

    return photoContainer;
  };

  var remove = function () {
    avatarPreview.src = defaultAvatar;
    var photos = Array.from(document.querySelectorAll('.ad-form__photo'));
    photos.forEach(function (it) {
      roomPhotoContainer.removeChild(it);
    });
  };

  avatarChooser.addEventListener('change', onInputTypeFileChange);
  roomPhotoChooser.addEventListener('change', onInputTypeFileChange);
  photoList.addEventListener('dragover', onPhotoListDragOver);

  window.photo = {
    add: add,
    remove: remove
  };
})();
