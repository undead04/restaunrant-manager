import { Server } from "socket.io";
import redisClient from "@shares/configs/redis";

export let io: Server; // Khai báo io ở phạm vi module

export const setupWebSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: "*" },
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  io.on("connection", async (socket) => {
    console.log("Client connected to WebSocket");

    const sub = redisClient.duplicate();
    console.log("🔗 Redis subscriber đã kết nối!");
    sub.subscribe("create_order", (err, count) => {
      if (err) {
        console.error("❌ Lỗi khi subscribe:", err);
        return;
      }
      console.log(`📡 Đã subscribe vào create_order (${count} kênh)`);
    });

    sub.on("message", (channel, message) => {
      if (channel === "create_order") {
        console.log(message);
        socket.emit("create_order", JSON.parse(message));
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", reason);
    });
  });
};
