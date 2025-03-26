import { NextFunction, Request, Response } from "express";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
import { validateInput } from "@shares/utils/ValidateInput";
import { orderService } from "../services/orderService";
import { IOrderFilter } from "../models/IOrderFilter";
import { OrderDTO } from "../models/OrderDTO";

export class OrderController {
  protected service: orderService;
  constructor() {
    this.service = new orderService();
  }
  async getFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter: IOrderFilter = req.query;
      const data = await this.service.getFilter(filter);
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = JSON.parse((req.headers["x-user"] as string) || "{}");
      const model: OrderDTO = new OrderDTO({ ...req.body, userId: user.id });
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", error));
        return;
      }
      const data = await this.service.create(model);

      res
        .status(200)
        .json(RepositoryDTO.Success(200, "Tạo dữ liệu thành công"));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      await this.service.remove(id);
      res
        .status(200)
        .json(RepositoryDTO.Success(200, "Xóa dữ liệu thành công"));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data = await this.service.getById(id);
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Tạo dữ liệu thành công", data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
