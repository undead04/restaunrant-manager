import { IsNumber, IsPositive } from "class-validator";

export class TableDistDTO {
  @IsNumber()
  @IsPositive()
  nameTable!: number;
}
