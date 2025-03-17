import { NextFunction, Request, Response } from "express";
import { RepositoryDTO } from "../../../../shared/utils/RepositoryDTO";
import { validateInput } from "../../../../shared/Errors/ValidateInput";
import { userService } from "../services/userService";
import { IUserFilter } from "../models/filterUser";
import { UserDTO } from "../models/UserDTO";

export class userController {
  protected service: userService;
  constructor() {
    this.service = new userService();
  }
  async getFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter: IUserFilter = req.query;
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
      const model: UserDTO = req.body;
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(error);
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
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const model: UserDTO = req.body;
      const id: number = Number(req.params.id);
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(error);
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
