import app from "./app";
import connectDB from "./database/database";

// Ensure DB connection only once (for serverless environments)
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

// Export app as Vercel serverless function handler
export default app;
