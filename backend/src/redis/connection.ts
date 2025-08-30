import { createClient } from "redis";

let redisClient = createClient({
  url: process.env.REDIS_URL,
});

const initializeRedis = async () => {
  try {
    redisClient.on("error", (err) => console.log("Error in redis", err));
    await redisClient.connect();
    console.log("✅ Redis connection successful");
  } catch (error) {
    console.log("Redis error", error);
    throw error;
  }
};

export { redisClient, initializeRedis };
