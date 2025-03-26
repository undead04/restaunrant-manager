export class RepositoryDTO<T> {
  status: number;
  message: string | null;
  data: T | null;
  errorDetails?: any; // Dữ liệu chi tiết về lỗi (tùy chọn)

  constructor(
    status: number,
    message: string | null,
    data: T | null,
    errorDetails?: any
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errorDetails = errorDetails;
  }

  public static WithData<T>(
    status: number,
    message: string,
    data: T
  ): RepositoryDTO<T> {
    return new RepositoryDTO<T>(status, message, data);
  }

  public static Success<T>(
    status: number,
    message: string = "Success"
  ): RepositoryDTO<T> {
    return new RepositoryDTO<T>(status, message, null);
  }

  public static Error<T>(
    status: number,
    message: string = "Error",
    errorDetails?: any
  ): RepositoryDTO<T> {
    return new RepositoryDTO<T>(status, message, null, errorDetails);
  }
}
