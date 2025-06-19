import { Router } from "express";
import { asynchandler } from "../../middleware/asynchandler.js";
import { loginVal, signupVal } from "./auth.validation.js";
import { login, signup, verifyAccount } from "./auth.controller.js";
import { isvalid } from "../../middleware/validation.js";
const authRouter=Router()
authRouter.post('/signups',isvalid(signupVal),asynchandler(signup))
authRouter.get('/verify/:token',asynchandler(verifyAccount))
authRouter.post('/login',isvalid(loginVal),asynchandler(login))
export default authRouter