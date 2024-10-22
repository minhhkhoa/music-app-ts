import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [get] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  //-lay ra slug dc gui kem tren url de tim 
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false
  })

  //-lay bai hat bang topicId
  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false
  }).select("avatar title slug singerId like ")

  //-lap qua songs de lay ra ten ca si thong qua singerId
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    })

    //-add key
    song["infoSinger"] = infoSinger //infoSinger.fullName
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs
  })
}

// [get] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  //-lay ra slug
  const slugSong: string = req.params.slugSong
  //-lay ra bai hát
  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false
  })

  //-lay ra thong tin ca si
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false
  }).select("fullName")

  //-lay ra thong tin chu de
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false
  }).select("title")

  //-render tim khi da yeu thich
  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id
  })

  // -addkey
  song["isFavoriteSong"] = favoriteSong ? true : false
  //-end render tim khi da yeu thich


  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  })
}

// [patch] /songs/like/:typeLike/:idSong
//-y/c la like nhung ko bi load lai trang --> viet theo API
export const like = async (req: Request, res: Response) => {
  //-lay ra idSong
  const idSong: string = req.params.idSong
  const typeLike: string = req.params.typeLike

  //-lay ra bai hat do
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  //-update lai luot like'

  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1
  await Song.updateOne({
    _id: idSong
  },
  {
    like: newLike
  })

  res.json({
    code: 200,
    message: "Thành công",
    like: newLike
  })
}

// [patch] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  //-lay ra idSong
  const idSong: string = req.params.idSong
  const typeFavorite: string = req.params.typeFavorite

  switch (typeFavorite) {
    case "favorite":
      //-check xem da yeu thich chua
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong
      })
      if(!existFavoriteSong){ //-neu ch yeu thich thi cho no yeu thich
        const record = new FavoriteSong({
          // userId: "",
          songId: idSong
        })

        await record.save()
      }
      break

    case "unfavorite":
      //-huy yeu thich: deleted: false or xoa luon
      await FavoriteSong.deleteOne({
        songId: idSong
      })
      break
      
    default:
      break;
  }

  res.json({
    code: 200,
    message: "Thành công",
  })
}

// [patch] /songs/listen:idSong
export const listen = async (req: Request, res: Response) => {
  //-lay ra id gui len
  const idSong: string = req.params.idSong

  //-tim bai hat theo id do (da update them key listen trong model Song)
  const song = await Song.findOne({
    _id: idSong
  })

  //-tinh luot nghe
  const listen: number = song.listen + 1

  await Song.updateOne({
    _id: idSong
  },{
    listen: listen
  })

  //-nen lam nhu nay de cho chinh xac hon
  const songNew = await Song.findOne({
    _id: idSong
  })

  res.json({
    code: 200,
    message: "Thành công",
    listen: songNew.listen
  })
}