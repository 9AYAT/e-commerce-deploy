import slugify from 'slugify'//db index
import { Category } from '../../../db/index.js'
//import { Category } from "../../../db/models/category.model.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import { deleteFile } from '../../utils/file.js'
import cloudinary from '../../utils/cloud.js'
//add cate
export const addCategory=async(req,res,next)=>{
   //get data from req
    let{name}=req.body
 name=name.toLowerCase()
 //check exist
 const categoryExist=await Category.findOne({name})
 if(categoryExist){
    return next(new AppError(messages.category.alreadyExist,400))
 }
 //upload image
 const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:'hti/category'})
 //prepare data npm i slugify
 const slug=slugify(name)//h&m =h-and-m
 const category=new Category({
    name,
    slug,
    image:{secure_url,public_id},
   // image:{path:req.file.path},
    //created by todo token
    createdBy:req.authUser._id
 })
 //add to db`  
 const createdCategory=await category.save()
 if(!createdCategory){
    // rollback delete image
     req.failImage={secure_url,public_id}
    return next(new AppError(messages.category.failToCreate,500))
 }
 //send response
 return res.status(201).json({message:messages.category.createsuccessfully,
    success:true,
    data:createdCategory})
}
//get all cate
export const getAllCategories=async(req,res,next)=>{//nestead populate
   const categories=await Category.find().populate([{path:"subcategories",populate:[{path:"category",populate:[{path:"subcategories"}]}]}])
   return res.status(200).json({success:true,data:categories})
}
//update category
export const updateCategory=async(req,res,next)=>{
   const {name}=req.body
   const{categoryId}=req.params
   //check exis
  const categoryExist=await Category.findById(categoryId)
  if(!categoryExist){
   return next(new AppError(messages.category.notfound,404))
  }
  const nameExist=await Category.findOne({name})
  if(nameExist){
   return next(new AppError(messages.category.alreadyExist,409))
  }
  if(name){
   categoryExist.name=name
   categoryExist.slug=slugify(name)
  }
//update name
if(req.file){
   deleteFile(categoryExist.image.path)
   categoryExist.image.path=req.file.path
}
//update
const updateCategory=categoryExist.save()
if(!updateCategory){return next(new AppError(messages.category.failToUpdate,500))}
return res.status(200).json({message:messages.category.updateCategory,success:true})
}