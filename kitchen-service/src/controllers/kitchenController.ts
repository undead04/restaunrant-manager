import { NextFunction, Request, Response } from "express";
import { kitchenService } from "../services/kitchenService";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
export class kitchenController {
  protected service;
  constructor() {
    this.service = new kitchenService();
  }
  async getOrderQueue(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.service.getOrderKitchen();
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
