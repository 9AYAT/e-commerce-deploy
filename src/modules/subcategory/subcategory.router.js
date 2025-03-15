import { Router } from "express";
import { fileUpload } from "../../utils/multer.js";
import { isvalid } from "../../middleware/validation.js";
import { addSubCategoryval } from "./subcategory.validation.js";

import { addSubCategory } from "./subcategory.controller.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
const subcategoryRouter=Router()
//add subcategory todo authenticate
subcategoryRouter.post('/',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.SELLER
]),
    fileUpload({folder:'subcategory'}).single('image'),
isvalid(addSubCategoryval),asynchandler(addSubCategory))
export default subcategoryRouter