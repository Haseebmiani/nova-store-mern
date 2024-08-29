import Redis from "redis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const redisClient = Redis.createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

console.log("Redis cache database connected...");

export default redisClient;
