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
image:{
        secure_url:{type:String,required:false},
        public_id:{type:String,required:false}
    },
createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:false
},
category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true
}


},{timestamps:true})
export const Subcategory=model('Subcategory',subcategorySchema)