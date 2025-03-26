import { NextFunction, Response } from "express";
import { userService } from "../services/userService";
import { IAuthRequest } from "@shares/models/IAuthRequest";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
import { IUserToken } from "@shares/models/IUserToken";

export class profileController {
  protected service: userService;
  constructor() {
    this.service = new userService();
  }
  async getProfile(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(req.user);
      const user = JSON.parse((req.headers["x-user"] as string) || "{}");
      const data = await this.service.getById(Number(user.id));
      res
        .status(200)
        .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
    } catch (error: any) {
      console.log(error);
      next();
    }
  }
}
