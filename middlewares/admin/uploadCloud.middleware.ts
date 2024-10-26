import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";
import Topic from "../../models/topic.model";


export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {

  try{
    if(req.file){ //-neu co file anh day len
      const result = await uploadToCloudinary(req["file"].buffer)
      req.body[req["file"].fieldname] = result
    }

  } catch(err){
    console.log(err)
  }

  next()
}

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  
  for(const key in req["files"]){
    req.body[key] = []

    const array = req["files"][key]
    for(const item of array){
      try {
        const result = await uploadToCloudinary(item.buffer)
        req.body[key].push(result)
      } catch (err) {
        console.log(err)
      }
    }
  }
  next()
}
