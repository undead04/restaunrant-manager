import amqp from "amqplib";

const QUEUE_NAME = "order_queue";

export const sendOrderToQueue = async (order: any) => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(order)), {
    persistent: true,
  });

  console.log(`Order ${order.orderId} sent to queue`);
};
