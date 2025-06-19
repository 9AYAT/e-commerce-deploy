import { Router } from "express";
import { cloudUpload } from "../../utils/multer-cloud.js";
import { isvalid } from "../../middleware/validation.js";
import { addBrandVal, deletebrandVal, updatebrandVal } from "./brand.validation.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addBrand, deleteBrand, getAllBrands, updateBrand } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
const brandRouter=Router()
//add brand todo auth
brandRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.USER
    ]),
    cloudUpload().single('logo'),
isvalid(addBrandVal),asynchandler(addBrand))
//update auth
brandRouter.put('/:brandId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.USER
    ]),
    cloudUpload().single('logo'),
 isvalid(updatebrandVal),
 asynchandler(updateBrand)
)

//delete
brandRouter.delete('/:brandId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),isvalid(deletebrandVal),asynchandler(deleteBrand)
)
//get brnad
brandRouter.get('/get',isAuthenticated(),isAuthorized([roles.USER]),asynchandler(getAllBrands))

export default brandRouter