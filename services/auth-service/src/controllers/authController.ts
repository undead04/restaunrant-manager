import { LoginDTO } from "../models/loginDTO";
import { IUserToken } from "../models/userToken";
import { authService } from "../services/authService";
import { createAccessToken } from "../utils/createToken";
import { RepositoryDTO } from "../../../../shared/utils/RepositoryDTO";
import { NextFunction, Request, Response } from "express";

export class authController {
  protected service;
  constructor() {
    this.service = new authService();
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const model: LoginDTO = req.body;
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
      };
      // Tạo refresh token và access token
      const accessToken = await createAccessToken(user);
      // Trả về response với dữ liệu người dùng và access token
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
