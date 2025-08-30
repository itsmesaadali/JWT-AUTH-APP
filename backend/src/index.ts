import app from "./app";
import { config } from "dotenv";
import { connectToDatabase } from "./mysql/connection";

config();

const init = async () => {
  try {
    await connectToDatabase()
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log("Backend Running on Port", PORT));
  } catch (error) {
    console.log('App running error', error);
    process.exit(1)
  }
};

init();
