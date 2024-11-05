//-Start Upload preview image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      //-gan scr bang dg dan toi file anh
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
}
//-End Upload preview image

//-Start Upload preview audio
const uploadAudio = document.querySelector("[upload-audio]")
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]")
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]")
  const source = uploadAudio.querySelector("source")

  uploadAudioInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      //-gan scr bang dg dan toi file anh
      source.src = URL.createObjectURL(file)
      uploadAudioPlay.load() //-load file đứng từ thẻ cha load
    }
  })
}
//-End Upload preview audio

// start delete topic
const buttonDelete = document.querySelectorAll("[button-delete]")
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item")
  const path = formDeleteItem.getAttribute("data-path")
  buttonDelete.forEach(btn => {
    btn.addEventListener("click", () => {
      //in ra thong bao xac nhan xoa ko
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?")

      if (isConfirm) {
        //neu dong y moi gui id sp muon xoa
        const id = btn.getAttribute("data-id")

        const action = `${path}/${id}?_method=DELETE`
        
      
        console.log(action)
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}

// end delete topic