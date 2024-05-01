import mongoose from 'mongoose';
import colors from 'colors';
//connect with database
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to MongoDB Database ${conn.connection.host}`.bgYellow.red);

    } catch (error) {
        console.log(`Error in MOngoDB ${error}`.bgRed.white);
    }
};

export default connectDB; 