import { IsNumber, IsPositive } from "class-validator";

export class TableDishDTO {
  @IsNumber()
  @IsPositive()
  nameTable: number;
  constructor(data: TableDishDTO) {
    this.nameTable = data.nameTable;
  }
}
