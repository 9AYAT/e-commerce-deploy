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
//delet
export const deleteFromWishlist=async(req,res,next)=>{
    //get data
    const{productId}=req.params
    const userId=req.authUser._id
        const userUpdated = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishList: productId } },
      { new: true } // 
    );
    
    return res.status(200).json({
      message: 'Wishlist updated successfully',
      success: true,
      data: userUpdated.wishList
    });
}
//get logged user wishlist
export const getWishlist=async(req,res,next)=>{
  const user=await User.findById(req.authUser._id,{wishList:1},{populate:[{path:"wishlist"}]})
  return res.status(200).json({data:user})
}