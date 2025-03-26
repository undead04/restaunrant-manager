import Redis from "ioredis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});
redisClient.on("error", (err) => console.error("Redis Error:", err));
export default redisClient;
