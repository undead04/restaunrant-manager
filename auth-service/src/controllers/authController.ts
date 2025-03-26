import { validateInput } from "@shares/utils/ValidateInput";
import { LoginDTO } from "../models/loginDTO";
import { IUserToken } from "../models/IUserToken";
import { authService } from "../services/authService";
import { createAccessToken } from "../utils/createToken";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
import { NextFunction, Request, Response } from "express";

export class authController {
  protected service;
  constructor() {
    this.service = new authService();
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const model: LoginDTO = new LoginDTO(req.body);
      const error = await validateInput(model);
      if (error) {
        res.status(400).json(RepositoryDTO.Error(400, "Gặp lỗi", error));
        return;
      }
      // Kiểm tra thông tin người dùng đăng nhập
      const userData = await this.service.isLogin(model);
      // Nếu thông tin đăng nhập không đúng
      if (userData == null) {
        res
          .status(400)
          .json(RepositoryDTO.Error(400, "Mật khẩu hoặc tên người dùng sai"));
        return;
      }
      const user: IUserToken = {
        id: userData.id.toString(),
        username: userData.username,
        roleName: userData.role.name,
        permission: userData.role.permissions.map((item) => item.name),
      };
      console.log(user);
      // Tạo refresh token và access token
      const accessToken = await createAccessToken(user);
      res.status(200).json(
        RepositoryDTO.WithData(200, "Đăng nhập thành công", {
          ...userData,
          token: accessToken,
        })
      );
    } catch (error: any) {
      console.error(error); // Log lỗi chi tiết
      next();
    }
  }
}
