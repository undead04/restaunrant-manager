// interfaces/IPaymentStrategy.ts
export interface IPaymentStrategy {
  pay(amount: number): Promise<any>; // Trả về trạng thái thanh toán
}
