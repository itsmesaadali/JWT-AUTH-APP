import mongoose from "mongoose";
import { config } from "../config/app.config";

let isConnected = false; // track the connection state

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.MONGO_URI, {
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    // ❌ Don't use process.exit(1) on Vercel
    throw error;
  }
};

export default connectDB;
