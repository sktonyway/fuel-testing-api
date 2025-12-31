import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        await mongoose.connect(url);
        console.log("Mongoose connected successfully.✌️");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;