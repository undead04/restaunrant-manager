import { IFilterPagination, IFilterSort } from "./IFilter";

export interface ICategoryDishFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
