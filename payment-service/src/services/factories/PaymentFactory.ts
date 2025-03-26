// factories/PaymentFactory.ts
import { IPaymentStrategy } from "../repository/interface/IPaymentStrategy";
import { StripePayment } from "../payment/stripePaymet";
import { MoMoPayment } from "../payment/momoPaymet";

export class PaymentFactory {
  static getPaymentMethod(
    method: string,
    orderCode: string,
    orderInfo?: string
  ): IPaymentStrategy {
    switch (method.toLowerCase()) {
      case "momo":
        return new MoMoPayment(orderCode, orderInfo!);
      case "stripe":
        return new StripePayment(orderCode);
      default:
        throw new Error("Phương thức thanh toán không hợp lệ!");
    }
  }
}
