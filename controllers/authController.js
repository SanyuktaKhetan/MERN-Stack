import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req,res) =>{
    try {
        //Details required for user registration 
        const {name,email,password,phone,address} = req.body;
        //validations
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!phone){
            return res.send({message:"Phone Number is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        
        //checking for existing users
        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Registered Please Login",
            });
        }

        //Register New User
        const hashedPassword= await hashPassword(password)

        //save 
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword
        }).save()
        res.status(201).send({
            status:true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success :false,
            message:'Error in Registration',
            error
        });
    }
};

//POST Method for LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password}=req.body

        //validate
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            });
        }
        //check if user is exisiting
        const user = await userModel.findOne({email})
        if(!user){
            return registerController.status(404).send({
                success:false,
                message:"Email Not Registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password",
            });
        }
        //creating token 
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error,
        });
    }
}; 

//test /demo route data
export const testController =(req,res)=>{
    res.send("Protected Route");
}