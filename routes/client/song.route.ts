import { Router } from "express";

const router: Router = Router()

import * as controller from "../../controllers/client/song.controller"

router.get("/:slugTopic", controller.list)

router.get("/detail/:slugSong", controller.detail)

router.patch("/like/:typeLike/:idSong", controller.like) //- vi co chinh sua db nen can bao mat

export const songRoutes: Router = router