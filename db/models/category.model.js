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
        type:Object//path
        ,required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",//todo 
         required:true
    }
},{timestamps:true,toJSON:{virtuals:true}})
categorySchema.virtual('subcategories',{
    ref:"Subcategory",
    localField:"_id",
    foreignField:"category"
})
export const Category=model("Category",categorySchema)

                                                         