import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisURL = process.env.REDIS_URL;

let redis;

if (redisURL) {
    redis = new Redis(redisURL);
    
    redis.on("connect", () => console.log("Redis connected"));
    redis.on("error", (err) => console.error("Redis Connection Error:", err.message));
} else {
    console.warn("REDIS_URL not found in .env. Caching will be disabled.");
}

export default redis;
