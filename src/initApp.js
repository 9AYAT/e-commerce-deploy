//import categoryRouter from "./modules/category/category.router.js"
import { globalErrorHandling } from "./middleware/asynchandler.js"
import { authRouter, brandRouter, cartRouter, categoryRouter
    , couponRouter, orderRouter, productRouter, reviewRouter, subcategoryRouter } from "./modules/index.js"
//import { globalErrorHandling } from "./utils/appError.js"
 export const initApp=(app,express)=>{
//parse req
    app.use(express.json())
    //routing
    app.use('/category',categoryRouter)
    app.use('/uploads',express.static('uploads'))
   //app.use('*',(req,res,next)=>{ return res.json({message:"invalid url"})})
    app.use('/subcategory',subcategoryRouter)
    app.use('/brand',brandRouter)
    app.use('/product',productRouter)
    app.use('/auth',authRouter)
    app.use('/review',reviewRouter)
    app.use('/coupon',couponRouter)
    app.use('/cart',cartRouter)
    app.use('/order',orderRouter)
    app.use(globalErrorHandling)
    app.use('*',(req,res,next)=>{ return res.json({message:"invalid url"})})
 }                                                           
//src