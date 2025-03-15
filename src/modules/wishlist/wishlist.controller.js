import { User } from "../../../db/index.js"
//add to wishlist
export const addToWishlist=async(req,res,next)=>{
    //get data
    const{productId}=req.params
    const userId=req.authUser._id
    //add to db
   const userUpdated= await User.findByIdAndUpdate(userId,{$addToSet:{wishList:productId}},{new:true})
   return res.status(200).json({message:'wishlist update successfully',success:true,data:userUpdated.wishList})
}
//add to set operator