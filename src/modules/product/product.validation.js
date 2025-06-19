import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addProductVal=joi.object({
    name:generalFields.name.required(),
    description:generalFields.description.required(),
    stock:generalFields.stock,
    price:generalFields.price.required(),
    discountType:generalFields.discountType,
    discount:generalFields.discount,
    sizes:generalFields.sizes,
    colors:generalFields.colors,
    category:generalFields.objectId.required(),
    subcategory:generalFields.objectId.required(),
    brand:generalFields.objectId.required(),
})
//update
export const updateProductVal = joi.object({
    productId: generalFields.objectId.required(), // must validate params
    name: generalFields.name.optional(),
    description: joi.string().optional().max(2000),
    stock: joi.number().positive().optional(),
    price: joi.number().positive().optional(),
    discount: generalFields.discount.optional(),
    discountType: generalFields.discountType.optional(),
    colors: generalFields.colors.optional(),
    sizes: generalFields.sizes.optional(),
    category: generalFields.objectId.optional(),
    subcategory: generalFields.objectId.optional(),
    brand: generalFields.objectId.optional(),
});
//deleteproduct
export const deleteProductVal = joi.object({
    productId: generalFields.objectId.required(), // must 
})