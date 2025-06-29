import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addToCart, deleteCart } from "./cart.controller.js";


const cartRouter=Router()
//add to cart
cartRouter.put('/',isAuthenticated(),isAuthorized([roles.USER]),
asynchandler(addToCart))
//delete
cartRouter.delete('/:productId',isAuthenticated(),isAuthorized([roles.USER]),
asynchandler(deleteCart))
export default cartRouter

