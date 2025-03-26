import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import permissionRules from "../models/PermissionRule";
import { IAuthRequest } from "@shares/models/IAuthRequest";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";
const SECRET_KEY = "accessToken";
export const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const rule = permissionRules.find(
    (r) => req.path.startsWith(r.path) && req.method === r.method
  );
  console.log(req.path);
  if (!rule) {
    res.status(404).json(RepositoryDTO.Error(404, "API not found"));
    return;
  }

  // Nếu không yêu cầu đăng nhập => Cho phép truy cập luôn
  if (!rule.requireAuth) {
    next();
    return;
  }
  // Kiểm tra token
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json(RepositoryDTO.Error(401, "Không có token"));
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as any;
    req.user = decoded; // Lưu thông tin user vào request
    // Kiểm tra quyền
    if (rule.permission.length == 0) {
      next();
      return;
    }
    if (!decoded.permission.includes(rule.permission.toString())) {
      res.status(403).json(RepositoryDTO.Error(403, "Bạn không đủ quyền"));
      return;
    }
    next(); // Tiếp tục nếu hợp lệ
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json(RepositoryDTO.Error(401, "Token hết hạn"));
      return;
    } else {
      res
        .status(401)
        .json(RepositoryDTO.Error(401, "Token không đúng định dạng"));
      return;
    }
  }
};
