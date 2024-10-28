import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

//[get]: /admin/singers
export const index = async (req: Request, res: Response) => {


  const singers = await Singer.find({
    deleted: false
  })
  res.render("admin/pages/singers/index", {
    pageTitle: "Danh sách các ca sĩ",
    singers: singers
  })
}

//[get]: /admin/singers/create
export const create = async (req: Request, res: Response) => {

  res.render("admin/pages/singers/create", {
    pageTitle: "Thêm ca sĩ mới"
  })
}

//[post]: /admin/singers/createPost
export const createPost = async (req: Request, res: Response) => {

  let avatar = ""
  if (req.body.avatar) {
    avatar = req.body.avatar
  }

  const dataSinger = {
    fullName: req.body.fullName,
    avatar: avatar,
    status: req.body.status
  }

  const singer = new Singer(dataSinger)

  await singer.save()

  res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}

//[delete]: /admin/singers/deleteSinger/:singerId
export const deleteSinger = async (req: Request, res: Response) => {

  const singerId = req.params.singerId

  await Singer.updateOne({
    _id: singerId
  },{
    deleted: true
  })

  res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}

//[get]: /admin/singers/detail/:singerId
export const detail = async (req: Request, res: Response) => {
  //- lay ra singerId dc gui len
  const singerId = req.params.singerId

  try {
    //-lay ra ca si theo id
    const singers = await Singer.findOne({
      _id: singerId,
      deleted: false
    }).select("-slug -deleted")

    console.log(singers)

    //-lay ra cac bai hat cua ca si do
    const songs = await Song.find({
      singerId: singerId
    })

    res.render("admin/pages/singers/detail",{
      pageTitle: "Chi tiết ca sĩ",
      singers: singers,
      songs: songs
    })
  } catch (error) {
    console.log(error)
  }
}

//[get]: /admin/singers/edit/:singerId
export const edit = async (req: Request, res: Response) => {

  //-lay ra singerid de do du lieu ra form
  const singerId = req.params.singerId
  //-lay ra ca si theo id
  const singers = await Singer.findOne({
    _id: singerId,
    deleted: false
  }).select("-slug -deleted")


  res.render("admin/pages/singers/edit",{
    pageTitle: "Chỉnh sửa ca sĩ",
    singers: singers
  })
}

//[patch]: /admin/singers/edit/:singerId
export const editPatch = async (req: Request, res: Response) => {
  //-lay ra id cua dua can sua
  const singerId = req.params.singerId

  try {
    //- tim ca si voi avatar cu(de phong no ko update anh)
    const singer = await Singer.findOne({
      _id: singerId
    }).select("avatar")

    // Nếu không có avatar mới, dùng avatar cũ
    req.body.avatar = req.body.avatar || singer.avatar;

    const dataSinger = {
      fullName: req.body.fullName,
      avatar: req.body.avatar,
      status: req.body.status
    }

    //-update du lieu thoi
    await Singer.updateOne({
      _id: singer
    }, dataSinger)


    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
  } catch (error) {
    console.error("Lỗi khi cập nhật topic:", error);
    res.status(500).send("Lỗi khi cập nhật ca sĩ.");
  }
}
