
import { model, Schema } from "mongoose";
import { discountTypes } from "../../src/utils/constant/enum.js";

const productSchema=new Schema({
    name:{type:String,
        required:true,
        trim:true
    },
    slug:{type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    stock:{type:Number
    ,min:0,
    default:1
    },
    price:{
type:Number,
required:true,
min:0
    }
,
    discount:{
        type:Number,
        min:0
    },
    discountType:{
        type:String,
        enum:Object.values(discountTypes),
        default:discountTypes.PERCENTAGE
    },
    colors:[String],
    sizes:[String],

  mainImage:{
    secure_url:{type:String,required:true},
    public_id:{type:String,required:true}
    
  },
  subImages:[{
    secure_url:{type:String,required:true},
    public_id:{type:String,required:true}}]
    
,
  //id

  category:{type:Schema.Types.ObjectId,ref:'Category',required:true},
  subcategory:{type:Schema.Types.ObjectId,ref:'Subcategory',required:true},
  brand:{type:Schema.Types.ObjectId,ref:'Brand',required:true},
  //
  createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true},//todo
  updatedBy:{type:Schema.Types.ObjectId,ref:'User',required:true}//todo
,
rate:{
    type:Number,
    default:5,
    max:5,
    min:1
}}
,{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
productSchema.methods.inStock=function(quantity){
    return this.stock<quantity ?false:true
}
productSchema.virtual('finalPrice').get(function(){
    //if(this.discountType==discountTypes.FIXED_AMOUNT){
       // return this.price=this.discount; }
  //  else{
         //p
         return this.price - (this.price*((this.discount||0) / 100))
    //}

})
export const Product=model('Product',productSchema)