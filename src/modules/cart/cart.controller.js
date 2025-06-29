import { Cart, Product } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
//add to cart
export const addToCart=async(req,res,next)=>{
    const{productId,quantity}=req.body
    //check product
    const productExist=await Product.findOne({ _id: productId })
    if(!productExist){
        return next(new AppError(messages.product.notfound,404))
    }
    if(!productExist.inStock(quantity)){ return next(new AppError('out of stock',400))}
    let data=''
    const productExistinCart=await Cart.findOneAndUpdate({user:req.authUser._id,"products.productId":productId},
        {"products.$.quantity":quantity},
        {new:true}
    )
 data=productExistinCart
    if(!productExistinCart){
       const addedProduct= await Cart.findOneAndUpdate({user:req.authUser._id},{
            $push:{products:{productId,quantity}}
        },{new:true})
        data=addedProduct
    }//send res
    return res.status(200).json({message:'added to cart successfully',success:true,data})

}
//delete 
export const deleteCart=async(req,res,next)=>{
const {productId}=req.params
const deletedProductFromCart=await Cart.findOneAndUpdate(
    {user:req.authUser._id},
    {$pull:{products:{productId}}},{new:true})

    if (!deletedProductFromCart ) {
      return next(new AppError("Cart not found or product not in cart", 404));}
  
    return res.status(200).json({
      message: messages.product.delettedsuccessfully,
      success: true,
      data:deletedProductFromCart, // ✅ Return the updated cart
    });
}
