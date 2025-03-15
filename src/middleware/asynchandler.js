import { AppError } from "../utils/appError.js"
import { deleteCloudImage } from "../utils/cloud.js"
import { deleteFile } from "../utils/file.js"

//asynchandler
export const asynchandler=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            return  next(new AppError(err.message,err.statusCode))
        })
    }
}
//global
export const globalErrorHandling=async(err,req,res,next)=>{
    //rollback fs
    if(req.file){
        deleteFile(req.file.path)
 }
    // rollback cloud
    if(req.failImage){
       await  deleteCloudImage(req.failImage.public_id)
    }
    //
    if(req.failImages?.length>0){//array
        for(const public_id of req.failImages){
            await deleteCloudImage(public_id)
        }
    }
     return res.status(err.statusCode||500).json(
        {message:err.message,success:false})
}