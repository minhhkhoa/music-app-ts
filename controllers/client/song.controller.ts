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
  for (const song of songs){
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    })

    //-add key
    song["infoSinger"] = infoSinger
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs
  })
}