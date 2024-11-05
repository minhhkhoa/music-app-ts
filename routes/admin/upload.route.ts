import { Router } from "express";

import multer from "multer"


const router: Router = Router()

import * as controller from "../../controllers/admin/upload.controller"

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer()

//- route nay dc tao ra khi muon đẩy ảnh khi insert từ tinyMCE len cloudinary
router.post(
  "/", 
  upload.single("file"), //- tinyMCE mac dinh tep gui len ten la File, tao api nay de hứng ảnh
  uploadCloud.uploadSingle,
  controller.index,
)

export const uploadRoutes: Router = router