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
  const createdReview= await review.save()
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
//. Get All Reviews for a Product
export const getAllReview=async(req,res,next)=>{
  const{productId}=req.params
  //check product
   const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError(messages.product.notfound, 404));
    }
     const reviews = await Review.find({ product: productId });
    return res.status(200).json({
      success: true,
      message: messages.review.getsuccess,
      results: reviews.length,
      data: reviews,
    });  }
    //delete
    export const deleteReview = async (req, res, next) => {
      //get data
    const { reviewId } = req.params;
    const userId = req.authUser._id;
     //check exist
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new AppError(messages.review.notfound, 404));
    }
    // check to make the user who make review delete it
    if (review.user.toString() !== userId.toString()) {
      return next(new AppError(messages.user.notfound, 403));
    }
//delete review
    await Review.findByIdAndDelete(reviewId);

    // update rate after delete
        const reviews = await Review.find({ product: review.product });
    let finalRate = 0;
    if (reviews.length > 0) {
      finalRate = reviews.reduce((acc, cur) => acc + cur.rate, 0) / reviews.length;
    }

    const productExist = await Product.findById(review.product);
    if (productExist) {
      await Product.findByIdAndUpdate(review.product, { rate: finalRate });
    }

    return res.status(200).json({
      success: true,
      message: messages.review.deletesuccess,
    });

};
