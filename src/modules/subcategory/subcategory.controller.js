import slugify from "slugify"
import { Category, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"

import { messages } from "../../utils/constant/message.js"

//add sub
export const addSubCategory=async(req,res,next)=>{
    //get data
   let{name,category}=req.body
    name=name.toLowerCase()
    //check exist
    const categoryExist=await Category.findById(category)
    if(!categoryExist){
        return next(new AppError(messages.category.notfound,400))
    }
    const subcategoryExist=await Subcategory.findOne({name})
    if(subcategoryExist){
        return next(new AppError(messages.subcategory.alreadyExist,409))
    }
    //prepare data
    const slug=slugify(name)
    const subcategory=new Subcategory({
        name,
        slug,
        image:{path:req.file?.path},
        category 
    })
   const createdsubcat= await subcategory.save()
   if(!createdsubcat){
    return next(new AppError(messages.subcategory.failToCreate,500))
   }
   //return res
   res.status(201).json({
    messages:messages.subcategory.createsuccessfully,
    success:true,
    data:createdsubcat})
}