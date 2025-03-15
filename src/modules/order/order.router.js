import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enum.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { createOrder } from "./order.controller.js";
import { orderEndpoint } from "./order.endpoint.js";
import { isvalid } from "../../middleware/validation.js";
import { createOrderVal } from "./order.validation.js";
const orderRouter=Router();
//create order
orderRouter.post("/",isAuthenticated(),
isAuthorized(orderEndpoint.public),
isvalid(createOrderVal),//for all people
asynchandler(createOrder))
export default orderRouter