import { IPaymentFilter } from "src/models/IPaymentFilter";
import { PaymentRepo } from "./repository/PaymentRepo";
import { Payment } from "../entities/Payment";
import { IPaymentDTO } from "src/models/PaymentDTO";
import { plainToInstance } from "class-transformer";
import CustomError from "@shares/models/CustomerError";
export class paymentService {
  protected repository: PaymentRepo;
  constructor() {
    this.repository = new PaymentRepo();
  }
  async getFilter(filter: IPaymentFilter): Promise<Payment[]> {
    const data = await this.repository.filter(filter);
    return data;
  }
  async create(data: IPaymentDTO): Promise<void> {
    const model: Payment = plainToInstance(Payment, {
      ...data,
    });
    await this.repository.create(model);
  }
  async update(id: number, data: IPaymentDTO): Promise<void> {
    const record = await this.isNotFound(id);
    const model: Payment = plainToInstance(Payment, {
      ...data,
    });
    await this.repository.update(record, model);
  }
  protected async isNotFound(id: number): Promise<Payment> {
    const record = await this.repository.getById(id);
    if (!record) {
      throw new CustomError(
        404,
        `Không tìm thấy thông tin chuyển khoảng này id =${id}`
      );
    }
    return record;
  }
  async remove(id: number): Promise<void> {
    await this.isNotFound(id);
    await this.repository.delete(id);
  }
  async getById(id: number): Promise<Payment | null> {
    const record = await this.repository.getById(id);
    if (!record) {
      throw new CustomError(
        404,
        `Không tìm thấy thông tin chuyển khoảng này id =${id}`
      );
    }
    return record;
  }
}
