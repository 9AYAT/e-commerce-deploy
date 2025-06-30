//import categoryRouter from "./modules/category/category.router.js"
import bodyParser from 'body-parser';
import Stripe from "stripe";
import { Cart, Order, Product } from "../db/index.js";
import { asynchandler, globalErrorHandling } from "./middleware/asynchandler.js"
import { authRouter, brandRouter, cartRouter, categoryRouter
    , couponRouter, orderRouter, productRouter, reviewRouter, subcategoryRouter, 
    wishlistRouter} from "./modules/index.js"
//import { globalErrorHandling } from "./utils/appError.js"
 export const initApp=(app,express)=>{
//parse req
    
     app.post('/webhook', bodyParser.raw({type: 'application/json'}), asynchandler(async (req, res) => {
        const payload = req.body;
        const sig = req.headers['stripe-signature'].toString();
        const stripe = new Stripe(process.env.STRIPE_KEY)
        let event = stripe.webhooks.constructEvent(payload, sig, '');
        if (
          event.type === 'checkout.session.completed'
          || event.type === 'checkout.session.async_payment_succeeded'
        ) {
            const checkout = event.data.object;
            const orderId = checkout.metaData.orderId;
            const cartId = checkout.metadata.cartId;
            // clear cart
            await Cart.findByIdAndUpdate(cartId,{products:[]})
            // update order status
            const orderExist = await Order.findByIdAndUpdate(orderId, {status:'Placed'},{new:true})
            await Cart.findOneAndUpdate({user:orderExist.user}, {products: []},{new:true})
            for (const product of orderExist.products) {
                await Product.findByIdAndUpdate(product.productId , {$inc:{stock: -product.quantity}})
            }
        }
    
        res.status(200).end();
      }));
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
    app.use('/wishlist',wishlistRouter)
    app.use(globalErrorHandling)
    app.use('/',(req,res,next)=>{ return res.json({message:"invalid url"})})
 }                                                           
//src