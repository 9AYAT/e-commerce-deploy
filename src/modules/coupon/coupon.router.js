import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { isvalid } from "../../middleware/validation.js";
import { addCuponVal } from "./coupon.validation.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addCupon } from "./coupon.controller.js";

const couponRouter=Router()


//add coupon
couponRouter.post('/',isAuthenticated(),isAuthorized([roles.ADMIN,roles.USER]),
isvalid(addCuponVal),
asynchandler(addCupon))
export default couponRouter