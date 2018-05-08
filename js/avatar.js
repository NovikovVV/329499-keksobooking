'use strict';

(function () {
  var FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.ad-form-header__preview img');
  var firstFileIndex = 0;

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[firstFileIndex];
    var fileName = file.name.toLowerCase();

    var matches = FILE_EXTENSIONS.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
    }

    reader.readAsDataURL(file);
  });
})();
