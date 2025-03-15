import fs from 'fs'
import path from 'path'
import {nanoid} from 'nanoid'
import multer,{ diskStorage} from 'multer'
import { AppError } from './appError.js'
import {fileValidation} from './multer.js'
export const cloudUpload=({allowFile=fileValidation.image}={})=>{
    const storage=diskStorage({
    }
    )
    const fileFilter=(req,file,cb)=>{
        if(allowFile.includes(file.mimetype)){
            return cb(null,true)
        }
        return cb(new AppError('invalid file format',400),false)//from udr
    }
    
return multer({storage,fileFilter})
}

