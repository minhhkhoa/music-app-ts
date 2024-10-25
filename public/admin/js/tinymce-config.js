const listTextareaMCE = document.querySelectorAll("[textarea-mce]")

if(listTextareaMCE.length > 0){
  listTextareaMCE.forEach((textarea) => {
    const id = textarea.id
    tinymce.init({
      //-tất cả cac thẻ textarea thành dạng nhập liệu đó
      selector: `#${id}`,
      plugins: 'image code',
      readonly: false,
      image_title: true,
      aotomatic_uploads: true,
      file_picker_types: "image",
      file_picker_callback: (cb, value, meta) => {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e) => {
          const file = e.target.files[0];

          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = reader.result.split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            cb(blobInfo.blobUri(), { title: file.name });
          });
          reader.readAsDataURL(file);
        });

        input.click();
      },
    });
  })
}

