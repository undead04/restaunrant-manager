import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";

export class roleDTO {
  @IsString({ message: "Tên phải là một chuổi văn bản" })
  @IsNotEmpty({ message: "Tên không được trống" })
  @MaxLength(50, { message: "Tên người dùng tối đa 50 kí tự" })
  name: string;
  @ArrayNotEmpty({ message: "Bắt buộc phải có quyền hạng" })
  permissions: number[];
  @IsString({ message: "Mô tả phải là một chuổi văn bản" })
  @IsNotEmpty({ message: "Mô tả không được trống" })
  @MaxLength(50, { message: "Mô tả người dùng tối đa 50 kí tự" })
  description!: string;
  constructor(data: roleDTO) {
    this.name = data.name;
    this.permissions = data.permissions;
    this.description = data.description;
  }
}
