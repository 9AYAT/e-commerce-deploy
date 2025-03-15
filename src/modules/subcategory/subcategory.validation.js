import { getRounds } from "bcrypt";
import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addSubCategoryval=joi.object({
    name:generalFields.name.required(),
    category:generalFields.objectId.required()
})