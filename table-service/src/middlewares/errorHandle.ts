import { NextFunction, Response, Request } from "express";
import CustomError from "@shares/models/CustomerError";
import { RepositoryDTO } from "@shares/utils/RepositoryDTO";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Kiểm tra nếu err là một CustomError
  if (err instanceof CustomError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.field);

    if (err.field) {
      res.status(err.statusCode || 422).json(
        RepositoryDTO.Error(err.statusCode, "Gặp lỗi", {
          [err.field]: err.message,
        })
      );
    } else {
      res
        .status(err.statusCode || 422)
        .json(RepositoryDTO.Error(err.statusCode, err.message));
    }
    return;
  }

  // Kiểm tra nếu err là một Error chuẩn
  if (err instanceof Error) {
    console.error("Internal Server Error:", err.message);
    res.status(500).json(RepositoryDTO.Error(500, "Internal Server Error"));
    return;
  }

  // Trường hợp lỗi không xác định
  res.status(500).json(RepositoryDTO.Error(500, "Unknown Error"));
};
