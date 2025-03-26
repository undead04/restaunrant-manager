import { Server } from "socket.io";
import redisClient from "@shares/configs/redis";

export const setupWebSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" }, // Đảm bảo không bị lỗi CORS
    pingInterval: 10000, // Kiểm tra kết nối mỗi 10s
    pingTimeout: 5000, // Ngắt kết nối sau 5s nếu không phản hồi
  });

  io.on("connection", async (socket) => {
    console.log("Client connected to WebSocket");

    const sub = redisClient.duplicate();
    console.log("🔗 Redis subscriber đã kết nối!");
    sub.subscribe("update_order", (err, count) => {
      if (err) {
        console.error("❌ Lỗi khi subscribe:", err);
        return;
      }
      console.log(`📡 Đã subscribe vào create_order (${count} kênh)`);
    });

    sub.on("message", (channel, message) => {
      if (channel === "update_order") {
        console.log(message);
        socket.emit("update_order", JSON.parse(message));
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", reason);
    });
  });
};
