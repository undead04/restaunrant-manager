import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDistDTO {
  @IsNotEmpty({ message: "Tên không được trống" })
  @IsString({ message: "Phải là string" })
  name!: string;
}
