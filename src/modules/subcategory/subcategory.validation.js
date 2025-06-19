import { getRounds } from "bcrypt";
import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addSubCategoryval=joi.object({
    name:generalFields.name.required(),
    categoryId:generalFields.objectId.required()
})
//update sub
export const updateSubcategoryVal=joi.object({
    name:generalFields.name,
    subcategoryId:joi.string().hex().length(24).required()
})
export const deleteSubCategoryVal=joi.object({
    subcategoryId:joi.string().hex().length(24).required()
})