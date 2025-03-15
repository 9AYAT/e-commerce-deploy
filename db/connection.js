import mongoose from 'mongoose'
export const connectDB=()=>{mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('db connect successfully')
}).catch((err)=>{
    console.log(err)
  //  console.log('failed to connect')
})}