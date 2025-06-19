import { model, Schema } from "mongoose";
import { orderStatus, paymentMethod } from "../../src/utils/constant/enum.js";
//schema
const orderSchema=new Schema({
user:{type:Schema.Types.ObjectId,ref:"User"},
products:[
    {
        productId:{
            type:Schema.Types.ObjectId,ref:"Product"
        },
finalPrice:Number,
price:Number,
name:String,
quantity:Number,
discount:Number
}],
address:{phone:String,
    street:String
},
coupon:{
    couponId:{type:Schema.Types.ObjectId,ref:"Coupon"},
    code:String,
    discount:Number
},
status:{
    type:String,
    enum:Object.values(orderStatus),
    default:orderStatus.PLACED,
},
orderPrice:Number,
finalPrice:Number,
paymentMethod:{
    type:String,
    enum:Object.values(paymentMethod),
    default:paymentMethod.CASH,
}

},{timestamps:true})
//model
export const Order=model('Order',orderSchema)