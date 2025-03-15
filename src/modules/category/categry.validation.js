import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
export const addCategoryVal=joi.object({
name:generalFields.name.required(),
})
export const updateCategory=joi.object({
    name:generalFields.name,
    categoryId:joi.string().hex().length(24)
})
