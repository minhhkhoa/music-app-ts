import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

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

  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  })
}

// [patch] /songs/like/:typeLike/:idSong
//-y/c la like nhung ko bi load lai trang
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