import { Router } from "express";

import multer from "multer" //-dung de upload anh

const router: Router = Router()


import * as controller from "../../controllers/admin/topic.controller"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer() //-dung de upload anh

router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
  "/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 8 }
  ]),
  uploadCloud.uploadFields,
  controller.createPost
)

router.get("/detail/:topicId", controller.detail)

router.get("/edit/:topicId", controller.edit)

router.patch(
  "/edit/:topicId", 
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
)

export const topicRoutes: Router = router 