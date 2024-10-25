//-Start Upload preview image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    console.log(file)
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