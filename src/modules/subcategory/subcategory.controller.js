import slugify from "slugify"
import { Category, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"
//add sub
export const addSubCategory=async(req,res,next)=>{
    //get data
   let{name,categoryId}=req.body
    name=name.toLowerCase()
    //check exist
    const categoryExist=await Category.findById(categoryId)
    if(!categoryExist){
        return next(new AppError(messages.category.notfound,400))
    }
    const subcategoryExist=await Subcategory.findOne({name,category: categoryId})
    if(subcategoryExist){
        return next(new AppError(messages.subcategory.alreadyExist,409))
    }
    //
     const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,
       {folder:'hti/subcategory'})
    //prepare data
    const slug=slugify(name)
    const subcategory=new Subcategory({
        name,
        slug,
        image:{secure_url,public_id},
     category: categoryId,
    createdBy: req.authUser._id
    })
   const createdsubcat= await subcategory.save()
   if(!createdsubcat){
    req.failImage={secure_url,public_id}
    return next(new AppError(messages.subcategory.failToCreate,500))}
   //return res
   res.status(201).json({messages:messages.subcategory.createsuccessfully, success:true, data:createdsubcat})}

   //get subcategories
   export const getAllSubcategories=async(req,res,next)=>{
    const subcategories=await Subcategory.find().populate('category')
    return res.status(201).json({status:true,data:subcategories})
   }
   
//update subcategory
export const updateSubcategory=async(req,res,next)=>{
const {name}=req.body
  const { subcategoryId } = req.params
const subcategoryExist=await Subcategory.findById(subcategoryId)
if(!subcategoryExist){
    return next(new AppError(messages.subcategory.updatedsuccessfully,404))
}//check name
  if (name) {
    const nameExist = await Subcategory.findOne({
      name,
     // category: categoryId || subcategory.category,
      _id: { $ne: subcategoryId },
    });
    if (nameExist) {
      return next(new AppError(messages.subcategory.alreadyExist, 409));
    }
    subcategoryExist.name = name;
    subcategoryExist.slug = slugify(name);
  }
   // Update image
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      public_id: subcategoryExist.image.public_id,
    });
    subcategoryExist.image = { secure_url, public_id };
    req.failImage = { secure_url, public_id };
  }
  const updatedSubcategory = await subcategoryExist.save();
  if (!updatedSubcategory) {
    return next(new AppError(messages.subcategory.failToUpdate, 500));
  }
  return res.status(200).json({ message: messages.subcategory.updateSubcategory, success: true, });
};

// Delete Subcategory
export const deleteSubcategory = async (req, res, next) => {
  const { subcategoryId } = req.params;
  const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
  if (!deletedSubcategory) {
    return next(new AppError(messages.subcategory.notfound, 404));
  }

  return res.status(200).json({
    message: messages.subcategory.delettedsuccessfully,
    data: deletedSubcategory,
  });
};

