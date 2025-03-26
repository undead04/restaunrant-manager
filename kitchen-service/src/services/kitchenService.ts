import { getAllPendingOrders } from "src/queue";

export class kitchenService {
  async getOrderKitchen() {
    const data = await getAllPendingOrders();
    return data;
  }
}
