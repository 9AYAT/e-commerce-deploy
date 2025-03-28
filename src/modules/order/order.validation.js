import joi from 'joi'
import { paymentMethod } from '../../utils/constant/enum.js'
export const createOrderVal=joi.object({
        phone:joi.string(),
        street:joi.string(),
        paymentMethod:joi.string().valid(...Object.values(paymentMethod)),
        coupon:joi.string(),
    })