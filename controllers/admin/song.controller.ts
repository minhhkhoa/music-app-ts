import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

//[get] /admin/topic
export const index = async (req: Request, res: Response) => {
  //-lay tat ca bai hat
  const songs = await Song.find({
    deleted: false
  })

  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName")

    const infoTopic = await Topic.findOne({
      _id: song.topicId,
      deleted: false
    }).select("title")

    //-add key
    song["infoSinger"] = infoSinger
    song["infoTopic"] = infoTopic
  }


  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs
  })
}

//[get] /admin/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  }).select("title")

  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName")

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers
  })
}

//[get] /admin/create
export const createPost = async (req: Request, res: Response) => {
  //-client gui data thong qua form--> req.body(cai tehm thu vien body-parser)
  //-vi co enctype="multipart/form-data" --. cai them thu vien multer --> nhung vao route

  let avatar = ""
  let audio = ""
  if (req.body.avatar) {
    avatar = req.body.avatar[0]
  }
  if (req.body.avatar) {
    audio = req.body.audio[0]
  }

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio
  }

  const song = new Song(dataSong)
  await song.save()

  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}