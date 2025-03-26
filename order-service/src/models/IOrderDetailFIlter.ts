import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";

export interface IOrderDetailFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
