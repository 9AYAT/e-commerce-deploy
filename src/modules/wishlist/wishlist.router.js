import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { addToWishlist, deleteFromWishlist} from "./wishlist.controller.js";
const wishListRouter=Router()
//add to wishlist
wishListRouter.post('/:productId',
    isAuthenticated(),isAuthorized([roles.USER,roles.ADMIN]),
    asynchandler(addToWishlist)
)
wishListRouter.delete('/:productId',
    isAuthenticated(),isAuthorized([roles.USER,roles.ADMIN]),
    asynchandler(deleteFromWishlist)
)

export default wishListRouter