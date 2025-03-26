// payments/MoMoPayment.ts
import CustomError from "@shares/models/CustomerError";
import { IPaymentStrategy } from "../repository/interface/IPaymentStrategy";
import crypto from "crypto";
import axios from "axios";

export class MoMoPayment implements IPaymentStrategy {
  protected orderCode: string;
  protected orderInfo: string;
  constructor(orderCode: string, orderInfo: string) {
    this.orderCode = orderCode;
    this.orderInfo = orderInfo;
  }
  async pay(amount: number): Promise<any> {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const endpoint = process.env.MOMO_ENDPOINT;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;

    if (
      !partnerCode ||
      !accessKey ||
      !secretKey ||
      !endpoint ||
      !redirectUrl ||
      !ipnUrl
    ) {
      throw new CustomError(
        400,
        "Missing required environment variables for MoMo payment."
      );
    }

    if (!this.orderCode || !amount || !this.orderInfo) {
      throw new Error("Invalid model data for MoMo payment.");
    }

    const requestId = this.orderCode;
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${requestId}&orderInfo=${this.orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const payload = {
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MoMoTestStore",
      requestType: "payWithMethod",
      ipnUrl: ipnUrl,
      redirectUrl: redirectUrl,
      orderId: requestId,
      amount: amount,
      lang: "vi",
      orderInfo: this.orderInfo,
      orderExpireTime: 30,
      requestId: requestId,
      extraData: "",
      signature: signature,
    };

    console.log("Raw Signature:", rawSignature);
    console.log("Payload:", payload);

    try {
      const response = await axios.post(endpoint, payload);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("MoMo API Error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from MoMo:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
      throw new CustomError(400, "Failed to create MoMo payment");
    }
  }
}
