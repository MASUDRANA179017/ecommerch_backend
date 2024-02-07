import mongoose from "mongoose";
import { dbName } from "../constants.js";



const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${dbName}`
        );
        console.log("mongodb connected", connectionInstance.connection.host);
    } catch (error){
        console.log("MONGODB CONNECTION FAILED", error);
    }
};

export default connectDB;