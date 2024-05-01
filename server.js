//express package
import express from 'express' ;
//colors package 
import colors from 'colors';
//dotenv package
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
 
//configure env
dotenv.config();

//databse config 
connectDB();
//rest object 
const app=express();

//middlewares
app.use(cors); 
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes); //url pattern 
//rest api 
app.get('/',(req,res)=>{
    res.send(
        "<h1>Welcome to DoGo App</h1>"
    );
})

//PORT Variable

const PORT = process.env.PORT || 5000;
 
//run the app - listen 

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port  ${PORT}`.bgCyan.black);
});