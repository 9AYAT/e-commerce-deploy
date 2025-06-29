import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addReview, deleteReview, getAllReview } from "./review.controller.js";
const reviewRouter=Router()
//add review
reviewRouter.post('/:productId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),
//validation
asynchandler(addReview)
)
//get
reviewRouter.get('/:productId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),asynchandler(getAllReview))
//delete
reviewRouter.delete('/:reviewId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),asynchandler(deleteReview))
export default reviewRouter