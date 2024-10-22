import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";


//[get] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`

  //- tim kiem bai hat
  let newSongs = []

  if (keyword) {//- them tv unicode giup loai bo dau tv //- tim kiem theo slug nhe
    
    const keywordRegex = new RegExp(keyword, "i") //- keywordRegex se la regex


    //-tao ra slug ko dau co them dau "-" Vd: Cắt đôi --> cat-doi
    const stringSlug: string = convertToSlug(keyword)
    const stringSlugRegex = new RegExp(stringSlug, "i") 

    //-lay ra cac bai hat ma co keywordRegex
    const songs = await Song.find({
      $or: [
        { title: keywordRegex }, { slug: stringSlugRegex }
      ]
    })

    // lay ra infoSinger tg ung vs bai hat do
    for(const item of songs){
      const infoSinger = await Singer.findOne({
        _id: item.singerId
      })

      //-add key
      item["infoSinger"] = infoSinger
    }
    newSongs = songs //-gan lai data
  }
  //-end tim kiem bai hat


  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: newSongs
  })
}