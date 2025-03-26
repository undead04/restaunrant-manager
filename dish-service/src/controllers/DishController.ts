import { NextFunction, Request, Response } from "express";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
import { validateInput } from "@shares/utils/ValidateInput";
import { dishService } from "../services/dishService";
import { IDishFilter } from "../models/IDishFilter";
import { DishDTO } from "../models/DishDTO";

export class DishController {
  protected service: dishService;
  constructor() {
    this.service = new dishService();
  }
  async getFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter: IDishFilter = req.query;
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
      const model: DishDTO = req.body;
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", error));
        return;
      }
      await this.service.create(model);
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
      const id: string = req.params.id;
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
      const id: string = req.params.id;
      const data = await this.service.getById(id);
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Tạo dữ liệu thành công", data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const model: DishDTO = req.body;
      const id: string = req.params.id;
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", error));
        return;
      }
      await this.service.update(id, model);
      res
        .status(200)
        .json(RepositoryDTO.Success(200, "Cập nhập dữ liệu thành công"));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
