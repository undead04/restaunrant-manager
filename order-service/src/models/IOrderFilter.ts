import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";

export interface IOrderFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
