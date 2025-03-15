import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addToWishlist } from "./wishlist.controller.js";
const wishListRouter=Router()
//add to wishlist
wishListRouter.post('/:productId',
    isAuthenticated(),isAuthorized([roles.USER,roles.ADMIN]),
    asynchandler(addToWishlist)
)
export default wishListRouter