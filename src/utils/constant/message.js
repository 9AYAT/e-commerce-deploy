const generateMessage=(entity)=>({
    alreadyExist:`${entity} already exist`,
    notfound:` not found ${entity}`,
    failToCreate:`fail to create ${entity}`,
    failToUpdate:`fail to update ${entity} `,
    failToDelete:`fail to delete ${entity}`,
    createsuccessfully:` ${entity} created successfully`,
     updatedsuccessfully:` ${entity} updated successfully`,
      delettedsuccessfully:` ${entity} deleted successfully`
})
export const messages={
    category:generateMessage('category'),
    subcategory:generateMessage('subcategory'),
    brand:generateMessage('brand'),
    product:generateMessage('product'),
    file:{required:'file is required'},
    user:{...generateMessage('user'),verified:"user verified success",invalidCredentials:"invalidCredentials",notAllowed:"user not allowed"}
    ,review:generateMessage('review'),
    coupon:generateMessage('coupon'),
    order:generateMessage("order")
}