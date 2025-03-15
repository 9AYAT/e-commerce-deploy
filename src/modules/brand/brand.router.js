import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isvalid } from "../../middleware/validation.js";
import { addBrandVal, updatebrandVal } from "./brand.validation.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addBrand, updateBrand } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
const brandRouter=Router()
//add brand todo auth
brandRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.SELLER
    ]),
    cloudUpload().single('logo'),
isvalid(addBrandVal),asynchandler(addBrand))
//update auth
brandRouter.put('/:brandId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.SELLER
    ]),
    cloudUpload().single('logo'),
 isvalid(updatebrandVal),
 asynchandler(updateBrand)
)


export default brandRouter