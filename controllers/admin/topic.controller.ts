import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";

//[get] /admin/topic
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  })
  
  
  res.render("admin/pages/topics/index", {
    pageTitle: "Quản lý chủ đề",
    topics: topics
  })
}

//[get] /admin/topics/create
export const create = async (req: Request, res: Response) => {
  
  res.render("admin/pages/topics/create",{
    pageTitle: "Thêm mới chủ đề"
  })
}
//[post] /admin/topics/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = ""
  if(req.body.avatar){
    avatar = req.body.avatar[0]
  }

  const dataTopic = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar
  }

  const topic = new Topic(dataTopic)
  await topic.save()
  res.redirect(`/${systemConfig.prefixAdmin}/topics`)
}

//[get] /admin/topics/detail/:topicId
export const detail = async (req: Request, res: Response) => {
  const topicId = req.params.topicId

  //-lay ra topic co id can xem chi tiet
  const topic = await Topic.findOne({
    _id: topicId,
    deleted: false,
    status: "active"
  }).select("title avatar description status")

  console.log(topic)


  res.render("admin/pages/topics/detail",{
    pageTitle: "Chi tiết chủ đề",
    topic: topic
  })
}

//[get] /admin/topics/edit/:topicId
export const edit = async (req: Request, res: Response) => {
  const topicId = req.params.topicId

  //-lay ra topic co id can xem chi tiet
  const topic = await Topic.findOne({
    _id: topicId,
    deleted: false,
    status: "active"
  }).select("title avatar description status")

  res.render("admin/pages/topics/edit", {
    pageTitle: "Chỉnh sửa chủ đề",
    topic: topic
  })
}

//[patch] /admin/topics/edit/:topicId
export const editPatch = async (req: Request, res: Response) => {
  const topicId = req.params.topicId;

  let avatar = "";
  if (req.file) {
    avatar = `/uploads/${req.file.filename}`; // Lưu đường dẫn ảnh
  } else if (req.body.avatar) {
    avatar = req.body.avatar; // Giữ nguyên nếu không tải file mới
  }

  const dataTopic = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar
  };

  console.log(dataTopic);

  // Cập nhật thông tin
  await Topic.updateOne({ _id: topicId }, dataTopic);

  res.redirect(`/${systemConfig.prefixAdmin}/topics`);
};
