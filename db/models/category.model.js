import {Schema,model}from 'mongoose'
const categorySchema=new Schema({
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
        //type:Object//path
        secure_url:{type:String,required:false},
        public_id:{type:String,required:false}
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",//todo 
         required:false
    }
},{timestamps:true,toJSON:{virtuals:true}})
categorySchema.virtual('subcategories',{
    ref:"Subcategory",
    localField:"_id",
    foreignField:"category"
})
export const Category=model("Category",categorySchema)

                                                         