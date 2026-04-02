import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
        console.log(`MongoDB connected to: ${process.env.MONGODB_URI}`)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}