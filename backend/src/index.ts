import app from "./app";
import connectDB from "./database/database";
import { config } from "./config/app.config";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Server isNot running =>", error);
      throw error;
    });

      app.listen(config.PORT, async () => {
      console.log(
        `Server listening on port ${config.PORT} in ${config.NODE_ENV}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed", error);
  });

export default app;
