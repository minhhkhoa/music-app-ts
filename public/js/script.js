// -aplayer 
const aplayer = document.querySelector('#aplayer')
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song") //-lay data
  dataSong = JSON.parse(dataSong) //- Vi khi gui tu html sang thi no la kieu json nen ta can chuyen lai ve js

  let dataSinger = aplayer.getAttribute("data-singer")
  dataSinger = JSON.parse(dataSinger)

  const ap = new APlayer({
    container: aplayer,
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar
    }],
    autoplay: true,
    //-option
  })

  // -fix khi phat nhac dia moi quay
  const avatar = document.querySelector(".singer-detail .inner-avatar")

  ap.on('play',  () => {
    avatar.style.animationPlayState = "running"
  })

  ap.on('pause',  () => {
    avatar.style.animationPlayState = "paused"
  })
  // -end fix khi phat nhac dia moi quay
}
//-end aplayer 
