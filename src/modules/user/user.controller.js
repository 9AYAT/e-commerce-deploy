import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"

export const deletUser=async(req,res,next)=>{
//get data soft delete
const userId=req.authUser._id
const user=await User.findByIdAndUpdate(userId,{isDeleted:true})
if(!user){
    return next(new AppError(messages.user.notfound,404))
}
return res.status(200).json({message:messages.user.delettedsuccessfully,success:true})
}