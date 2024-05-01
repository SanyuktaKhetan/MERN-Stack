import mongoose from "mongoose";

//creating model for DB
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        reuiqred:true,
        trim:true //no white space
    },
    email:{
        type:String,
        required:true,
        unique:true //no same email id , on email - one user id
    },
    password:{
        type:String,
        reuiqred:true,
    },
    phone:{
        type:String, //you can add country code 
        required:true,
    },
    address : {
        type:String,
        required:true,
    },
    role:{  //0 for user and 1 for admin 
        type:Number,
        default:0, //0 for false , 1 for true
    }  ,   
}, {timestamps :true}); // stores the time when new user is created

export default mongoose.model('users',userSchema);