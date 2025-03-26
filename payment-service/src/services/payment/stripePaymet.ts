// payments/MoMoPayment.ts
import CustomError from "@shares/models/CustomerError";
import { IPaymentStrategy } from "../repository/interface/IPaymentStrategy";
import Stripe from "stripe";
import api from "src/utils/API";

export class StripePayment implements IPaymentStrategy {
  protected stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  protected YOUR_DOMAIN: string = process.env.YOUR_DOMAIN!;
  protected orderCode: string;
  constructor(orderCode: string) {
    this.orderCode = orderCode;
  }
  async pay(amount: number): Promise<any> {
    const order = await api
      .get(`${api.url.urlOrder}/${api.url.order}/${this.orderCode}`)
      .then((res) => res.data.data)
      .catch((error) => {
        console.error(
          "�� L��i API Order:",
          error.response?.data || error.message
        );
        throw new CustomError(500, "L��i kết nối đến API Order");
      });
    // 2️⃣ Gọi API lấy danh sách món ăn song song
    const dishs = await Promise.all(
      order.orderDetails.map(async (orderDetail: any) => {
        await this.fetchDishData(orderDetail.dishId);
      })
    );
    const session = await this.stripe.checkout.sessions.create({
      line_items: dishs.map((dish) => ({
        price_data: {
          currency: "VND",
          product_data: {
            name: dish.name,
            description: dish.description,
            images: [dish.url_image],
          },
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${this.YOUR_DOMAIN}/success.html`,
      cancel_url: `${this.YOUR_DOMAIN}/cancel.html`,
      expires_at: Math.floor(Date.now() / 1000) + 1800,
      metadata: {
        orderCode: this.orderCode,
      },
    });
    return {
      url: session.url,
      session_id: session.id,
    };
  }
  // 📌 Hàm lấy dữ liệu món ăn
  async fetchDishData(dishId: string) {
    return api
      .get(`${api.url.urlDish}/${api.url.dish}/${dishId}`)
      .then((res) => res.data.data)
      .catch((error) => {
        console.error(
          "❌ Lỗi API Dish:",
          error.response?.data || error.message
        );
        throw new CustomError(
          400,
          `Không tìm thấy món ăn có id = ${dishId}`,
          "dishId"
        );
      });
  }
}
