import app from "./app";
import connectDB from "./database/database";

let isConnected = false;

const initDB = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected successfully ✅");
    } catch (error) {
      console.error("MongoDB connection failed ❌", error);
    }
  }
};

initDB();

export default app;
