import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentiacation.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { asynchandler } from "../../middleware/asynchandler.js";
import { roles } from "../../utils/constant/enum.js";
import { deletUser } from "./user.controller.js";
const userRouter=Router()
//deleteuser
userRouter.patch('/',isAuthenticated(),isAuthorized([roles.USER]),asynchandler(deletUser))
export default userRouter