import slugify from "slugify"
import { Brand, Product, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/message.js"
import cloudinary from "../../utils/cloud.js"
import { json } from "express"
import { ApiFeature } from "../../utils/apiFeature.js"

//add product
export const addProduct=async(req,res,next)=>{
    //get data from req
const{name,description,stock,price,discount,discountType,
    colors,sizes,category,subcategory,brand}=req.body
    //check exist
    //1-brand
    const brandExist=await Brand.findById(brand)//{} null
    if(!brandExist){
        return next(new AppError(messages.brand.notfound,404))
    }
    //2-sub
    const subcategoryExist=await Subcategory.findById(subcategory)
    if(!subcategoryExist){
        return next(new AppError(messages.subcategory.notfound,404))
    }
    //upload images
    //req.files
  const{secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder:"hti/products/mainImages"
    })
    let mainImage={secure_url,public_id}
    //rollback 
    req.failImages=[]
    req.failImages.push(public_id)
    //subimages
    let subImages=[]
   // req.files.subImages.forEach(async(file) => {
     // const{secure_url,public_id} =await cloudinary.uploader.upload(file.path,{folder:'hti/products/subImages'})
    //subImages.push({secure_url,public_id}) });
     //pre
     //console.log(req.files)
     for( const file of req.files.subImages){
        const{secure_url,public_id} =await cloudinary.uploader.upload(file.path,{folder:'hti/products/subImages'})
     subImages.push({secure_url,public_id}) 
    //rollback
    req.failImages.push(public_id)

     }
     const slug=slugify(name)
     const product=new Product({
        name,slug,description,stock,price,discount,discountType,
        colors:JSON.parse(colors)
        ,sizes:JSON.parse(sizes)
        ,category,subcategory,brand,mainImage,subImages,
        createdBy:req.authUser._id,
        updatedBy:req.authUser._id

     })
     //add to db
    const createdProduct= await product.save()
    //console.log(createdProduct)
    if(!createdProduct){
        //rollback
        return next (new AppError(messages.product.failToCreate,500))
    }
    return res.status(201).json({message:messages.product.createsuccessfully,
        success:true,
        data:createdProduct
    }
)
}
//get product
//page size data skip
//1     3    123  0
//2     3    456  3
// pag sort select
      
export const getAllProduct=async(req,res,next)=>{
    let{page,size,sort,select,...filter}=req.query
   // let filter=json.parse(JSON.stringify(req.query))//deecopy
   // let excludedFields=['sort','select','size','page']
   // excludedFields.forEach(ele=>{  
   //     delete filter[ele]  })
    //console.log(select)
   /// filter=JSON.parse(JSON.stringify(filter).replace(/'gte|gt|lte|lt'/g,match=>
   //      `$${match}`))
    //if(!page||page<=0)
    //{
      //  page=1
  //  }
   // if(!size||size<=0){
   //     size=3
    //}
   // let skip=(page-1)*size
   // sort=sort?.replaceAll(',',' ')
    //select=select?.replaceAll(',',' ')

  //  console.log({se})
   // const mongooseQuery= Product.find(filter)
   // mongooseQuery.limit(size).skip(skip)
   // mongooseQuery.sort(sort)
    //mongooseQuery.select(select)//chain 
   // const products =await mongooseQuery
    const apiFeature=new ApiFeature(Product.find(),req.query).pagination().sort().select().filter()
    const products=await apiFeature.mongooseQuery
    return res.status(200).json({success:true,data:products
    })
}
//update product
export const updateProduct=async(req,res,next)=>{
           const{productId}=req.params
            const { name, description, stock, price, discount,
                 discountType, colors, sizes, category, subcategory, brand } = req.body;
               //check exist
               const products=await Product.findById(productId)  
               if (!products) {
            return next(new AppError(messages.product.notfound, 404));
        }
          // Optional: Check if the updated brand exists
        if (brand) {
            const brandExist = await Brand.findById(brand);
            if (!brandExist) {
                return next(new AppError(messages.brand.notfound, 404));
            }
            products.brand = brand;
        }

        // Optional: Check if the updated subcategory exists
        if (subcategory) {
            const subcategoryExist = await Subcategory.findById(subcategory);
            if (!subcategoryExist) {
                return next(new AppError(messages.subcategory.notfound, 404));
            }
            products.subcategory = subcategory;
        }
        //name
        if(name){
            products.name=name
            products.slug=slugify(name)
        }
         if (description) products.description = description;
        if (stock) products.stock = stock;
        if (price) products.price = price;
        if (discount) products.discount = discount;
        if (discountType) products.discountType = discountType;
        if (colors) products.colors = JSON.parse(colors);
        if (sizes) products.sizes = JSON.parse(sizes);
        if (category) products.category = category;
        //re.files main
         if (req.files?.mainImage?.length) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
                public_id: products.mainImage.public_id // override
            });
            products.mainImage = { secure_url, public_id };
            req.failImages = [{ secure_url, public_id }];
        }
// reqfile subimage
 if (req.files?.subImages?.length) {
            let subImages = [];
            req.failImages = [];
            for (const file of req.files.subImages) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'hti/products/subImages' });
                subImages.push({ secure_url, public_id });
                req.failImages.push({ secure_url, public_id });
            }
            products.subImages = subImages;
        }
          products.updatedBy = req.authUser._id;

        const updatedProduct = await products.save();
        if (!updatedProduct) {
            return next(new AppError(messages.product.failToUpdate, 500));
        }

        return res.status(200).json({
            message: messages.product.updateProduct,
            success: true,
            data: updatedProduct
        });
}   
// delete product
export const deleteProduct = async (req, res, next) => {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return next(new AppError(messages.product.notfound, 404));
        }
        // Optional: Delete product images from cloudinary
        //delete mainimage
        await cloudinary.uploader.destroy(deletedProduct.mainImage.public_id);
        //delete subimage
        for (const img of deletedProduct.subImages) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        return res.status(200).json({
            message: messages.product.deleteProduct,
            success: true,
            data: deletedProduct
        });
    }