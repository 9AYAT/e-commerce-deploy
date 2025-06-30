import { Router } from "express";
import { fileUpload } from "../../utils/multer.js";
import { isvalid } from "../../middleware/validation.js";
import { addSubCategoryval, deleteSubCategoryVal, updateSubcategoryVal } from "./subcategory.validation.js";

import { addSubCategory, deleteSubcategory, getAllSubcategories, updateSubcategory } from "./subcategory.controller.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { cloudUpload } from "../../utils/multer-cloud.js";

const subcategoryRouter=Router()
//add subcategory todo authenticate
subcategoryRouter.post('/',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER
]),
    cloudUpload({folder:'subcategory'}).single('image'),
isvalid(addSubCategoryval),asynchandler(addSubCategory))

//get subcategories
subcategoryRouter.get('/',asynchandler(getAllSubcategories))
//update subcategory 
subcategoryRouter.put('/:subcategoryId',isAuthenticated(),isAuthorized([roles.ADMIN,roles.USER]),
 cloudUpload({folder:'subcategory'}).single('image'),isvalid(updateSubcategoryVal),asynchandler(updateSubcategory))

 //delet
 subcategoryRouter.delete('/:subcategoryId',isAuthenticated(),
 isAuthorized([roles.ADMIN,roles.USER]),isvalid(deleteSubCategoryVal),asynchandler(deleteSubcategory)
 )
 export default subcategoryRouter