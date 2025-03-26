import { IFilterPagination, IFilterSort } from "./IFilter";

export interface IDishFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
