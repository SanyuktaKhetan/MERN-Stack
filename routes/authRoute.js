import express from 'express';
import {registerController , loginController,testController} from  '../controllers/authController.js'
import {isAdmin,requireSignIn} from "../middlewares/authMiddleware.js";

//router object 
const router = express.Router();

//routing 
// for register || METHOD POST 
router.post("/register", registerController);

//Login || POST Method

router.post('/login',loginController)


//demo routes data
router.get('/test',requireSignIn,isAdmin,testController);



export default router;