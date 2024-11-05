import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

//[get] /admin/songs
export const index = async (req: Request, res: Response) => {
  //-lay tat ca bai hat
  const songs = await Song.find({
    deleted: false
  })

  for (const song of songs) {

    //- ko ne de deleted:false boi vi khi xoa casi hoac topic minh se de nos bang true 
    //- nen khi truy van o day se ko tim ra dau
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      // deleted: false
    }).select("fullName")

    const infoTopic = await Topic.findOne({
      _id: song.topicId,
      // deleted: false
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

//[get] /admin/songs/create
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

//[post] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  //-client gui data thong qua form--> req.body(cai tehm thu vien body-parser)
  //-vi co enctype="multipart/form-data" --. cai them thu vien multer --> nhung vao route

  let avatar = ""
  let audio = ""
  if (req.body.avatar) {
    avatar = req.body.avatar[0]
  }
  if (req.body.audio) {
    audio = req.body.audio[0]
  }

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics
  }

  const song = new Song(dataSong)
  await song.save()

  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

//[get] /admin/songs/edit/id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id

  const song = await Song.findOne({
    _id: id,
    deleted: false
  })

  //-lay topic de do ra view
  const topics = await Topic.find({
    deleted: false
  }).select("title")

  //-lay singer do ra view
  const singers = await Singer.find({
    deleted: false
  }).select("fullName")

  res.render("admin/pages/songs/edit",{
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers
  })

}


//[delete] /admin/songs/delete?:topicId
export const deleteSong = async (req: Request, res: Response) => {

  const songId = req.params.songId
  await Song.updateOne({
    _id: songId
  }, {
    deleted: true
  })

  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

//[patch] /admin/songs/edit/id
export const editPatch = async (req: Request, res: Response) => {

  const id = req.params.id

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics
  }

  if (req.body.avatar) {
    dataSong["avatar"] = req.body.avatar[0]
  }
  if (req.body.audio) {
    dataSong["audio"] = req.body.audio[0]
  }

  await Song.updateOne({
    _id: id
  },dataSong)

  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}
