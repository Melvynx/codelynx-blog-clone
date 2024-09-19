import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://fancy-basilisk-20131.upstash.io",
  token: process.env.UPSTASH_REDIS_TOKEN,
});
