import { AppError } from "../utils/appError.js"
import { messages } from "../utils/constant/message.js"
export const isAuthorized=(roles)=>{
    return (req,res,next)=>{
        //req>>>authUserr
       if(!roles.includes(req.authUser.role)){
        return next(new AppError(messages.user.notAllowed,401))
       }
next()
    }
}