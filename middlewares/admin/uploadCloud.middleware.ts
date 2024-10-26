import { Request, Response, NextFunction } from "express";
import { uploadToCloudinary } from "../../helpers/uploadToCloudinary";
import Topic from "../../models/topic.model";


export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  const topicId = req.params.topicId
  const topic = await Topic.findOne({
    _id: topicId,
    deleted: false
  })
  try{
    if(req.file){ //-neu co file anh day len
      const result = await uploadToCloudinary(req["file"].buffer)
      req.body[req["file"].fieldname] = result
    }
    else{
      //- neu ko co file anh day le ==> ko muon thay doi anh
      //=> lay anh cu
      req.body.avatar = topic.avatar; 
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
