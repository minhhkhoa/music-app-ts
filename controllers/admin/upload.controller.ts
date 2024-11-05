import { Request, Response } from "express";

//[get] /admin/upload
export const index = async (req: Request, res: Response) => {

  res.json({
    location: req.body.file //- bat buoc key la location
  })
}
