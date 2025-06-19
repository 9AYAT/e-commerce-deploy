import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
export const addCategoryVal=joi.object({
name:generalFields.name.required(),
})
export const updateCategoryVal=joi.object({
    name:generalFields.name,
    categoryId:joi.string().hex().length(24).required()
})
//delete
export const deleteCategoryVal=joi.object({
    categoryId:joi.string().hex().length(24).required()
})