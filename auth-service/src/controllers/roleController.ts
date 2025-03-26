import { NextFunction, Request, Response } from "express";
import { IRoleFilter } from "../models/filterRole";
import { roleService } from "../services/roleService";
import { roleDTO } from "../models/roleDTO";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
import { validateInput } from "@shares/utils/ValidateInput";

export class roleController {
  protected service: roleService;
  constructor() {
    this.service = new roleService();
  }
  async getFilter(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validParams = ["search", "orderBy", "sort", "page", "pageSize"];
      const receivedParams = Object.keys(req.query);

      const invalidParams = receivedParams.filter(
        (p) => !validParams.includes(p)
      );
      if (invalidParams.length > 0) {
        res
          .status(400)
          .json(
            RepositoryDTO.Error(
              400,
              `Tham số không hợp lệ: ${invalidParams.join(", ")}`
            )
          );
        return;
      }

      const filter: IRoleFilter = req.query;
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
      const model: roleDTO = new roleDTO(req.body);
      const errors = await validateInput(model);
      if (errors) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", errors));
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
        .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const model: roleDTO = new roleDTO(req.body);
      const id: number = Number(req.params.id);
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", error));
        return;
      }
      console.log(model);
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
