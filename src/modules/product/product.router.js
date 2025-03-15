import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isvalid } from "../../middleware/validation.js";
import { addProductVal } from "./product.validation.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addProduct, getAllProduct } from "./product.controller.js";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { roles } from "../../utils/constant/enum.js";
const productRouter=Router()
//add product
productRouter.post('/',isAuthenticated(),
isAuthenticated([roles.ADMIN,roles.SELLER
]),
    cloudUpload().fields([{name:'mainImage',maxCount:1},{name:"subImages",maxCount:5}]),
isvalid(addProductVal),asynchandler(addProduct))
//get product
productRouter.get('/',asynchandler(getAllProduct))
export default productRouter