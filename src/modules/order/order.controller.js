import Stripe from "stripe";//class
import { Cart, Coupon, Order, Product } from "../../../db/index.js";
import { AppError } from "../../utils/appError.js";
import { discountTypes } from "../../utils/constant/enum.js";
import { messages } from "../../utils/constant/message.js";
export const createOrder=async(req,res,next)=>{
    const{street,phone,coupon,paymentMethod}=req.body;
    //check coupon
    let couponExist;
    if(coupon){
     couponExist=await Coupon.findOne({code:coupon});
    if(!couponExist){
        return next(new AppError(messages.coupon.notfound,404))
    }}
    //check cart 
    const cart =await Cart.findOne({user:req.authUser._id})
    if(!cart){
 return next(new AppError('not have cart',400))
    }
    let products=cart.products;
    let orderProducts=[];
    let orderPrice=0;
    let finalPrice=0;
    for(const product of products){
        //check exist
        const productExist=await Product.findById(product.productId)
        if(!productExist){
            return next(new AppError(messages.product.notfound,404))
        }
        //check quanntity
        if(!productExist.inStock(product.quantity)){
            return next(new AppError("out of stock",400))
        }
      orderPrice+=productExist.finalPrice*product.quantity
      orderProducts.push({
        productId:productExist._id,
        price:productExist.price,
        finalPrice:productExist.finalPrice,
        quantity:product.quantity,
        discount:productExist.discount,
        name:productExist.name
      })
      couponExist.discountType==discountTypes.FIXED_AMOUNT
      ? finalPrice=orderPrice-couponExist.discountAmount
      :finalPrice=orderPrice-(orderPrice*((couponExist.discountAmount||0)/100))}
    //prepare order
    const order=new Order({
        user:req.authUser._id,
        address:{phone,street},
        coupon:{couponId:couponExist._id,
        code:coupon,
        discount:couponExist.discount},
        paymentMethod,
        products:orderProducts,
        orderPrice,
        finalPrice
    })
const createOrder=await order.save();
if(!createOrder){
    return next(new AppError(messages.order.failToCreate,500))
}
//integrate payment gateway 
if(paymentMethod=='visa'){
    const stripe=new Stripe('sk_test_51R2hKFGdrGHx05yvNqzxG4YtzWWogcFnkRsoOOv1nD4Ox8qreGHye8vt3L0EEsx8rjQJjbgjqBMKfaArOCBWiFGC00vyHIWEB7')
   const checkout= await stripe.checkout.sessions.create({
     success_url:"https://www.google.com",
     cancel_url:"https://www.facebook.com",
     payment_method_types:['card'],
     mode:'payment',
     line_items:createOrder.products.map((product)=>{
        return{
            price_data:{
                currency:'egp',
                product_data:{
                    name:product.name
                },
                unit_amount:product.price*100//for format 
            },
            quantity:product.quantity
        }
     })
    })
    return res.status(200).json({message:messages.order.createsuccessfully,
        success:true,
        data:createOrder,
        url:checkout.url
    })
}
//send res
return res.status(201).json({message:messages.order.createsuccessfully,
    success:true,
    data:createOrder
})}