import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import Topic from "../../models/topic.model";

//[get] /admin/topic
export const index = async (req: Request, res: Response) => {
  //-lay tat ca bai hat
  const songs = await Song.find({
    deleted: false
  })

  for(const song of songs){
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