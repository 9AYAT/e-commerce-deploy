import fs from 'fs'
import path from 'path'
import {nanoid} from 'nanoid'
import multer,{ diskStorage} from 'multer'
import { AppError } from './appError.js'
export const fileValidation={
    image:['image/jpeg','image/png'],
    file:['application/pdf','applicatin/msword'],
    video:['video/mp4']
}
export const fileUpload=({folder,allowFile=fileValidation.image})=>{
    const storage=diskStorage({destination:(req,file,cb)=>{
        const fullPath=path.resolve(`uploads/${folder}`)
   if(!fs.existsSync(fullPath)){
    fs.mkdirSync(fullPath,{recursive:true})
   }
  // console.log({folder})
 cb(null,`uploads/${folder}`)
    },
        filename:(req,file,cb)=>{
        cb(null,nanoid()+"_"+file.originalname)
        }
    })
    const fileFilter=(req,file,cb)=>{
        if(allowFile.includes(file.mimetype)){
            return cb(null,true)
        }
        return cb(new AppError('invalid file format',400),false)//from udr
    }
    
return multer({storage,fileFilter})
}
