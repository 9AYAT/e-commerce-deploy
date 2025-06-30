import bcrypt from 'bcrypt'
import { Cart, User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import { sendEmail } from '../../utils/email.js'
import { generateToken, verifyToken } from '../../utils/token.js'
export const signup=async(req,res,next)=>{
    //get data
    let{name,email,password,phone}=req.body
    //check exist
    const userExist=await User.findOne({$or:[{email},{phone}]})//{}null
    if(userExist){
        return next(new AppError(messages.user.alreadyExist,409))}
//pre data
//hash pass
password=bcrypt.hashSync(password,8)
const user=new User({
    name
    ,email
    ,password ,
    phone   })
//add to db
const createdUser=await user.save()
if(!createdUser){
    return next (new AppError(messages.user.failToCreate,500))
}
const token=generateToken({payload:{email,_id:createdUser._id}})
await sendEmail({to:email,subject:"verify your account",
html:`<p>click on link to verify account<a href="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></p>`})
return res.status(201).json({message:messages.user.createsuccessfully,success:true,
    data:createdUser
})
}
export const verifyAccount=async(req,res,next)=>{
    //get data
    const {token}=req.params
    const payload=verifyToken({token})
    await User.findOneAndUpdate({email:payload.email,status:"pending"},{status:"verified"},{new:true})
   await Cart.create({user:payload._id,products:[]})
    return res.status(200).json({message:messages.user.verified,success:true})
}
export const login=async(req,res,next)=>{
    //get data
    const {email,phone,password}=req.body
    //cjeck exist
    const userExist=await User.findOne({$or:[{email},{phone}],status:"verified"})
    if(!userExist){
        return next(new AppError(messages.user.notfound,400))
    }
    const match=bcrypt.compareSync(password,userExist.password)
    if(!match){
        return next(new AppError(messages.user.invalidCredentials,400))
    }
    //updaate is deleted
    userExist.isDeleted=false
    await userExist.save()
    //generate token
    const token=generateToken({payload:{_id:userExist._id,email}})
    return res.status(200).json({message:"login successfully",success:true,token})
        //data:userExist})
}
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UwNmU0MzZkZDk2YTVlNzU1MWVkMGQiLCJlbWFpbCI6ImF5YXRhYmRlbHJobWFuNTE0QGdtYWlsLmNvbSIsImlhdCI6MTc0Mjc2MTYzOX0.7VbkD0BvllzPJESgd--ee_f8qI74VSxKUoZ8kph5JeU"