import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from "class-validator";

export class UserDTO {
  @IsOptional()
  @IsUrl({}, { message: "urlImage phải là một URL hợp lệ" })
  urlImage!: string;

  @IsString({ message: "address phải là một chuổi hợp lệ" })
  @IsOptional()
  address!: string;

  @IsString({ message: "address phải là một chuổi hợp lệ" })
  @IsNotEmpty({ message: "Mã người dùng không được trống" })
  codeUser!: string;

  @IsString({ message: "Tên người dùng phải là một chuổi hợp lệ" })
  @IsNotEmpty({ message: "Tên người dùng không được trống" })
  username!: string;

  @IsString({ message: "Tên người dùng phải là một chuổi hợp lệ" })
  @IsNotEmpty({ message: "Tên người dùng không được trống" })
  @MinLength(9, { message: "Mật khẩu ít nhất 8 kí tự" })
  password!: string;

  @IsEmail({}, { message: "Enail phải là một email hợp lệ" })
  @IsNotEmpty({ message: "Enail không được trống" })
  email!: string;

  @IsPhoneNumber("VN", { message: "Số đinệ thoại không hợp lệ" })
  phone!: string;
  role: number;
  constructor(data: UserDTO) {
    this.role = data.role;
    this.phone = data.phone;
    this.address = data.address;
    this.codeUser = data.codeUser;
    this.username = data.username;
    this.password = data.password;
    this.urlImage = data.urlImage;
  }
}
