export class OrderDetailDTO {
  dishId: number;
  quantity: number;
  constructor(data: OrderDetailDTO) {
    this.dishId = data.dishId;
    this.quantity = data.quantity;
  }
}
