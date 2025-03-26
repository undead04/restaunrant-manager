import amqp from "amqplib";
import redisClient from "./configs/redis";
import { io } from "./websocket";
import api from "./utils/api";

const QUEUE_NAME = "order_queue";

const MAX_CONCURRENT_ORDERS = 10; // Giới hạn số món chế biến cùng lúc
let currentProcessingOrders = 0;

const processOrders = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log("🍽️ Bếp sẵn sàng nhận đơn hàng...");

  channel.consume(QUEUE_NAME, async (msg) => {
    if (msg && currentProcessingOrders < MAX_CONCURRENT_ORDERS) {
      currentProcessingOrders++; // Tăng số món đang chế biến

      const order = JSON.parse(msg.content.toString());
      console.log(`👨‍🍳 Bếp bắt đầu làm món cho bàn ${order.table}`);
      api.put(
        `${api.url.urlOrder}/${api.url.orderDetail}/${order.id}`,
        "IN_PROGRESS"
      );
      io.emit("updateOrder", { ...order, status: "IN_PROGRESS" });

      // Đợi bếp xác nhận xong
      const checkOrderStatus = async () => {
        const updatedOrder = await api
          .get(`${api.url.orderDetail}/${api.url.orderDetail}/${order.id}`)
          .then((res) => res.data.data)
          .catch((err) => console.log(err));
        if (updatedOrder?.status === "DONE") {
          console.log(`✅ Món ăn bàn ${order.table} đã hoàn thành!`);
          channel.ack(msg);
          currentProcessingOrders--; // Giảm số món đang chế biến

          // Sau khi hoàn thành món này, lấy món mới từ hàng đợi
          setTimeout(() => channel.get(QUEUE_NAME, { noAck: false }), 100);
        } else {
          setTimeout(checkOrderStatus, 3000); // Kiểm tra lại sau 1s
        }
      };

      checkOrderStatus();
    }
  });
};

processOrders();
