import path from 'path'
import express from 'express'
import {scheduleJob} from 'node-schedule'
import dotenv from 'dotenv'//npm
import { connectDB } from './db/connection.js'
import categoryRouter from './src/modules/category/category.router.js'
//import { globalErrorHandling } from './src/utils/appError.js'
import { initApp } from './src/initApp.js'
import { User } from './db/index.js'
import cloudinary from './src/utils/cloud.js'
const app=express()
dotenv.config({path:path.resolve('./config/.env')})//env for os
connectDB()
initApp(app,express)
scheduleJob('1 2 1 * * *',async() => { 
    const users = await User.find({isDeleted: true , updatedAt: {$lte: Date.now()-3*30*24*60*60*1000}})
    // delete all related image
    let userIds = []
    
    for (const user of users) {
        userIds.push(user._id)
        await cloudinary.uploader.destroy(user.image.public_id)

    }
    // deleted all related documents
        await User.deleteMany({_id: {$in :userIds}})
});

const port=process.env.port || 3000
app.listen(port,()=>{
    console.log('server is running on',port)
})