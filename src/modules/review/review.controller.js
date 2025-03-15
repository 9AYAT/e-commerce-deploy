import { Product, Review } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
export const addReview=async(req,res,next)=>{
    //get data
    const{comment,rate}=req.body
    const{productId}=req.params
    const userId=req.authUser._id
    //check product exist
    const productExist=await Product.findById(productId)  
    if(!productExist){
        return next (new AppError(messages.product.notfound,404))}
    //todocheck if user has order on this product
    //pre data
    const reviewExist=await Review.findOneAndUpdate({user:userId,product:productId},{rate,comment},{new:true})
    let data=reviewExist
    if(!reviewExist){
        const review=new Review({
            user:userId,product:productId,
            comment,rate,
            isVerified:false//todo true if has any orders
            })
  const createdReview= await reviews.save()
  if(!createdReview){
    return next(new AppError(messages.review.failToCreate))
  }
  data=createdReview}
  //update product rate
  const reviews=await Review.find({product:productId})//[{}]
  //let finalRate=0
//reviews.forEach(review => {
    //finalRate+=review.rate
  //});
  //finalRate=finalRate/reviews.length
  let finalRate=reviews.reduce((acc,cur)=>{
 return acc+=cur.rate
  },0)
  finalRate/=reviews.length
  await Product.findByIdAndUpdate(productId,{rate:finalRate})
  //send res
  return res.status(201).json({
    message:messages.review.createsuccessfully,
    success:true,
    data
  })
}