import { validate } from "class-validator";

export async function validateInput<T extends Object>(data: T) {
  const errors = await validate(data);
  console.log(errors);

  if (errors.length > 0) {
    const errorsMessage = errors.reduce((acc, error) => {
      if (error.constraints) {
        acc[error.property] = Object.values(error.constraints)[0]; // Chỉ lấy giá trị nếu constraints tồn tại
      }
      return acc;
    }, {} as Record<string, string>);

    console.log(errorsMessage);
    return errorsMessage;
  }

  return null;
}
