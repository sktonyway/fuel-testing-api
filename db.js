import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/testing");
        console.log("Mongoose connected successfully.✌️");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;