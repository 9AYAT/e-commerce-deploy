import slugify from "slugify"
import { Brand } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import cloudinary  from "../../utils/cloud.js"
import { messages } from "../../utils/constant/message.js"

export const addBrand=async(req,res,next)=>{
    //get data
    let {name}=req.body
    name=name.toLowerCase()
    //check exist
    const brandExist=await Brand.findOne({name})
    if(brandExist){
        return next (new AppError(messages.brand.alreadyExist))
        
    }
    //upload image
    const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,
       { folder:'hti/brand'}
    )
    //pre obj
    const slug=slugify(name)
    const brand=new Brand({name
        ,slug
        ,logo:{secure_url,public_id},
    createdBy:req.authUser._id})
//createdby: token

//add to db
const createdBrand=await brand.save()
if(!createdBrand){
    //rollback
    req.failImage={secure_url,public_id}
    return next(new AppError(messages.brand.failToCreate,500))}
   // send res
return res.status(201).json({
   message: messages.brand.createsuccessfully,
   success:true,
   data:createdBrand
})
}
//udate
export const updateBrand=async(req,res,next)=>{
    //get data
    let{name}=req.body
    const{brandId}=req.params
    name=name.toLowerCase()
    //check exist
    const brandExist=await Brand.findById(brandId)//obj null
    if(!brandExist){
        return next (new AppError(messages.brand.notfound,404))
    }
    //check name exist
    const nameExist=await Brand.findOne({name,_id:{$ne:brandId}})//obj null
    if(nameExist){return next(new AppError(messages.brand.alreadyExist,409))}
    //pre data
    if (name){
        const slug=slugify(name)
        brandExist.name=name
        brandExist.slug=slug
    }
    //upload image
    if(req.file){
        //delete old image
       //await cloudinary.uploader.destroy(brandExist.logo.public_id)
        //upload new 
        
      const{secure_url,public_id}  =await cloudinary.uploader.upload(req.file.path,{
           // folder:"hti/brand",
           public_id:brandExist.logo.public_id//override
        })
    

 brandExist.logo={public_id,secure_url}

 req.failImage={secure_url,public_id}}
 //update
 const updatedBrand=await brandExist.save()
 if(!updatedBrand){
   
    return next(new AppError(messages.brand.failToUpdate))}
    //send res
    return res.status(200).json({message:messages.brand.updatedsuccessfully
        ,success:true,
        data:updatedBrand
    })
}
//getbrand-getsecific all 2api
//deletebrand  