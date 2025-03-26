import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";
export interface IUserFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
