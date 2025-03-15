import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addReview } from "./review.controller.js";
const reviewRouter=Router()
//add review
reviewRouter.post('/:productId',isAuthenticated(),
isAuthorized([roles.ADMIN,roles.USER]),
//validation
asynchandler(addReview)
)
export default reviewRouter