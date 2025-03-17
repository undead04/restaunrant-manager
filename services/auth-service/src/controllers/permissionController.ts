import { NextFunction, Response, Request } from "express";
import { permissionService } from "../services/permissionService";
import { RepositoryDTO } from "../../../../shared/utils/RepositoryDTO";

export class permissionController {
  protected service: permissionService;
  constructor() {
    this.service = new permissionService();
  }
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.service.getAll();
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
    } catch (error: any) {
      console.log(error);
      next();
    }
  }
}
