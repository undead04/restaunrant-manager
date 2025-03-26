import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";

export interface ITableDishFiler extends IFilterPagination, IFilterSort {
  search?: string;
  status?: boolean;
}
