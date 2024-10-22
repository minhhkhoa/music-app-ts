import { Request, Response } from "express";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [get] /favorite-songs/
export const index = async(req: Request, res: Response) => {
  //-lay ra bai hat yeu thich
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
    deleted: false
  }).select("songId")

  //-lay ra thong tin bai hat
  for (const item of favoriteSongs){
    const infoSong = await Song.findOne({
      _id: item["songId"]
    })

    //-lay ra ten casi
    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId
    })

    //-add key
    item["infoSong"] = infoSong,
    item["infoSinger"] = infoSinger
  }
  
  res.render("client/pages/favorite-songs/index",{
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs
  })
}