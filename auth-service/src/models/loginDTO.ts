import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
  @IsString({ message: "Tên phải là một chuổi văn bản" })
  @IsNotEmpty({ message: "Tên không được trống" })
  @MaxLength(50, { message: "Tên người dùng tối đa 50 kí tự" })
  username: string;
  @IsString({ message: "Mật khẩu phải là một chuổi văn bản" })
  @IsNotEmpty({ message: "Mật khẩu không được trống" })
  @MaxLength(50, { message: "Mật khẩu dùng tối đa 50 kí tự" })
  @MinLength(8, { message: "Mật khẩu có ít nhất 8 kí tự" })
  password: string;
  constructor(data: LoginDTO) {
    this.username = data.username;
    this.password = data.password;
  }
}
