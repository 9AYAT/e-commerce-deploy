import { Coupon } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { discountTypes } from "../../utils/constant/enum.js"
import { messages } from "../../utils/constant/message.js"
export const addCupon=async(req,res,next)=>{
    const{code,discountAmount,discountType,toDate,fromDate}=req.body
    const userId=req.authUser._id
    //check coupon exist
    const couponExist=await Coupon.findOne({code})//{} null
    if(couponExist){
        return next(new AppError(messages.coupon.alreadyExist,409))
    }
    //check if percentage 
    if(discountType==discountTypes.PERCENTAGE && discountAmount > 100){
        return next(new AppError('must be less than 100',400))
    }
    //prepare coupon
    const coupon=new Coupon({
        code,discountAmount,discountType,toDate,fromDate,
        createdBy:userId//,assignedUsers:[]
    })
    //add to db
    const createdCoupon=await coupon.save()
    if(!createdCoupon){
        return next(new AppError(messages.coupon.failToCreate,500))
    }
    return res.status(201).json({message:messages.coupon.createsuccessfully,success:true,data:createdCoupon})
}