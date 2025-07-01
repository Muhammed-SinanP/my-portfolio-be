import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoDB_URI = process.env.MONGODB_URI;
    if (!mongoDB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoDB_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

export default connectDB;
