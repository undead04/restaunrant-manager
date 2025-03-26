import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from "class-validator";

export class DishDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description!: string;
  url_image!: string;
  @IsNumber()
  @IsPositive()
  price!: number;
  categoryDish!: string;
}
