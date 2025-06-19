import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addBrandVal=joi.object({
    name:generalFields.name.required()
})
export const updatebrandVal=joi.object({
    name:generalFields.name,
    brandId:generalFields.objectId.required()
})
export const deletebrandVal=joi.object({
    brandId:generalFields.objectId.required()
})