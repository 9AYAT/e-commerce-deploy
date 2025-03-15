import { Cart, Product } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
//add to cart
export const addToCart=async(req,res,next)=>{
    const{productId,quantity}=req.body
    //check product
    const productExist=await Product.findById(productId)
    if(!productExist){
        return next(new AppError(messages.product.notfound,404))
    }
    if(productExist.stock<quantity){ return next(new AppError('out of stock',400))}
    let data=''
    const productExistinCart=await Cart.findOneAndUpdate({user:req.authUser._id,"products.productId":productId},
        {"products.$.quantity":quantity},
        {new:true}
    )
 data=productExistinCart
    if(!productExistinCart){
       const addedProduct= await Cart.findOneAndUpdate({user:req.authUser._id},{
            $push:{products:{productId,quantity}}
        },{new:true}),
        data=addedProduct
    }//send res
    return res.status(200).json({message:'added to cart successfully',success:true,data})

}