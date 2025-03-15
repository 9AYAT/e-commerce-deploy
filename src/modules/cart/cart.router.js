import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addToCart } from "./cart.controller.js";

const cartRouter=Router()
//add to cart
cartRouter.put('/',isAuthenticated(),isAuthorized([roles.USER]),
asynchandler(addToCart))
export default cartRouter