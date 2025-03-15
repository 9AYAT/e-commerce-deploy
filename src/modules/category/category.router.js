import {Router} from 'express'
import { fileUpload } from '../../utils/multer.js'
import { isvalid } from '../../middleware/validation.js'
import { addCategoryVal, updateCategory } from './categry.validation.js'
import { addCategory, getAllCategories } from './category.controller.js'
import { asynchandler } from '../../middleware/asynchandler.js'
import { isAuthenticated } from '../../middleware/authentiacation.js'
import { isAuthorized } from '../../middleware/authorization.js'
import { roles } from '../../utils/constant/enum.js'
import { cloudUpload } from '../../utils/multer-cloud.js'
const categoryRouter=Router()
//add todo authenticate 
categoryRouter.post('/',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.SELLER]),
    cloudUpload({folder:'category'}).single('image'),//busboy parsedata //RETURN MIDDLEWARE
isvalid(addCategoryVal),
asynchandler(addCategory)
)
//get category
categoryRouter.get('/',asynchandler(getAllCategories))
//update category todo auth
categoryRouter.put('/:category',fileUpload({folder:'category'}).single('image'),
isvalid(updateCategory),asynchandler(updateCategory))
export default categoryRouter