import { model, Schema } from "mongoose";
//schema
const cartSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    products:[
        { productId:{type:Schema.Types.ObjectId,ref:"Product"},
            quantity:Number ,
        _id:false}]
})
//model
export const Cart=model('Cart',cartSchema)
