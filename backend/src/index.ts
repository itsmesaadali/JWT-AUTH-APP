import app from "./app";
import { config } from "dotenv";

config();

const init = async () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log("Backend Running on Port", PORT));
};


init();