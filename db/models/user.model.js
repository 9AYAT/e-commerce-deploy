
import { model, Schema } from "mongoose";
import { roles } from "../../src/utils/constant/enum.js";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
     type:String,
    required:true,
    unique:true,
    trim:true
    },
    role:{
        type:String,
        enum:Object.values(roles),
        default:roles.USER
    },
   status:{
    type:String,
    enum:['pending','verified','blocked'],
    default:'pending'
   },
    image:{
        secure_url:{type:String,required:false},
        public_id:{type:String,required:false}
    },
    //DOB:{type:String,default:Date.now()},
    wishList:[{type:Schema.Types.ObjectId,ref:'Product'}]
    ,  isDeleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true})
export const User=model('User',userSchema)