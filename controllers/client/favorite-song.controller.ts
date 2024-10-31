import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [get] /favorite-songs/
export const index = async (req: Request, res: Response) => {
  //-lay ra bai hat yeu thich
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
    deleted: false
  }).select("songId")

  //  favoriteSongs là một mongoose document array
  //- khi no gui di se gui tat ca cac bai no tim thay, mac cho dieu kien ben dưới
  //- là tìm bài nào có _id: item["songId"], deleted: false, nhưng khi gửi đi
  //- nó vẫn gửi cả bài có deleted: true nen se gay ra loi. Vi the can phai 
  //- check xem favoriteSongs.filter((item) => item["infoSong"]);
 

  //-lay ra thong tin bai hat
  for (const item of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: item["songId"],
      deleted: false,
    })

    if (infoSong) {
      //-lay ra ten casi
      const infoSinger = await Singer.findOne({
        _id: infoSong.singerId
      })

      //-add key
      item["infoSong"] = infoSong,
      item["infoSinger"] = infoSinger
      
    }
  }

  //-se co va de la 
  // const favoriteSongs = [
  //   { songId: "1", infoSong: { slug: "song-1", title: "Song 1" } },
  //   { songId: "2" }, // Không có `infoSong`
  //   { songId: "3", infoSong: { slug: "song-3", title: "Song 3" } },
  // ];

  // Lọc ra chỉ các bài hát có infoSong hợp lệ tức là nó phải có infoSong mới được
  const validFavoriteSongs = favoriteSongs.filter((item) => item["infoSong"]);
  
  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: validFavoriteSongs
  })
}