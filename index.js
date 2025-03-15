import path from 'path'
import express from 'express'
import dotenv from 'dotenv'//npm
import { connectDB } from './db/connection.js'
import categoryRouter from './src/modules/category/category.router.js'
//import { globalErrorHandling } from './src/utils/appError.js'
import { initApp } from './src/initApp.js'
const app=express()
dotenv.config({path:path.resolve('./config/.env')})//env for os
connectDB()
initApp(app,express)
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('server is running on',port)
})