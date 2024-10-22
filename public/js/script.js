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

  ap.on('play', () => {
    avatar.style.animationPlayState = "running"
  })

  ap.on('pause', () => {
    avatar.style.animationPlayState = "paused"
  })
  // -end fix khi phat nhac dia moi quay
}
//-end aplayer 

//-button like
const buttonLike = document.querySelector("[button-like]")
if (buttonLike) {
  buttonLike.addEventListener("click", () => { //- gawn sk cho nut do
    //-lay ra id
    const idSong = buttonLike.getAttribute("button-like")

    //-tao API
    const isActive = buttonLike.classList.contains("active") //-ktra xem chua class la "active ko" - co active tuc la da like
    const typeLike = isActive ? "dislike" : "like"

    const option = {
      method: "PATCH"
    }

    const link = `/songs/like/${typeLike}/${idSong}`
    fetch(link, option)//-fetch goi toi dg link do
      .then(res => res.json()) //- cho phan hoi ve
      .then(data => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span")
          span.innerHTML = `${data.like} Thích` //- viet lai giao dien

          buttonLike.classList.toggle("active") //-muc dich de css khi an vao thi to xanh
        }
      })
  })
}
//-end button like

//-button favorite
const ListButtonFavorite = document.querySelectorAll("[button-favorite]")
if (ListButtonFavorite.length > 0) {
  ListButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => { //- gawn sk cho nut do
      //-lay ra id
      const idSong = buttonFavorite.getAttribute("button-favorite")
  
      //-tao API
      const isActive = buttonFavorite.classList.contains("active") //-ktra xem chua class la "active ko" - co active tuc la da like
      const typeFavorite = isActive ? "unfavorite" : "favorite"
  
      const option = {
        method: "PATCH"
      }
  
      const link = `/songs/favorite/${typeFavorite}/${idSong}`
      fetch(link, option)//-fetch goi toi dg link do
        .then(res => res.json()) //- cho phan hoi ve
        .then(data => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active") //-muc dich de css khi an vao thi to xanh
          }
        })
    })
  })
}
//-end button favorite
