import {Schema,model}from 'mongoose'


const subcategorySchema=new Schema({
//name:String,
name:{type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true//space
},
slug:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},
image:{type:Object
,required:true
},


createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true
}


},{timestamps:true})
export const Subcategory=model('Subcategory',subcategorySchema)