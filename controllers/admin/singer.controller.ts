import { Request, Response } from "express";

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
