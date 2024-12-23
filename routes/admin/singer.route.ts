import { Router } from "express";

import multer from "multer"

const router: Router = Router()

import * as controller from "../../controllers/admin/singer.controller"

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer()

router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
  "/create", 
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
)

router.get("/detail/:singerId", controller.detail)

router.get("/edit/:singerId", controller.edit)

router.patch(
  "/edit/:singerId",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
)

router.delete(
  "/delete/:singerId",
  controller.deleteSinger
)


export const singerRoutes: Router = router
