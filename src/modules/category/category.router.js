import {Router} from 'express'
import { fileUpload } from '../../utils/multer.js'
import { isvalid } from '../../middleware/validation.js'
import { addCategoryVal,deleteCategoryVal,updateCategoryVal } from './categry.validation.js'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from './category.controller.js'
import { asynchandler } from '../../middleware/asynchandler.js'
import { isAuthenticated } from '../../middleware/authentiacation.js'
import { isAuthorized } from '../../middleware/authorization.js'
import { roles } from '../../utils/constant/enum.js'
import { cloudUpload } from '../../utils/multer-cloud.js'
const categoryRouter=Router()
//add todo authenticate 
categoryRouter.post('/',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),
    cloudUpload({folder:'category'}).single('image'),//busboy parsedata //RETURN MIDDLEWARE
isvalid(addCategoryVal),
asynchandler(addCategory)
)
//get category
categoryRouter.get('/',asynchandler(getAllCategories))
//update category todo auth
categoryRouter.put('/:categoryId',isAuthenticated(),isAuthorized([roles.ADMIN,roles.USER]),
 cloudUpload({folder:'category'}).single('image'),isvalid(updateCategoryVal),asynchandler(updateCategory))
//delete
categoryRouter.delete('/:categoryId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),isvalid(deleteCategoryVal),asynchandler(deleteCategory)
)
export default categoryRouter