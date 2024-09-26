import { createClient } from "redis";

export const redis = await createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
