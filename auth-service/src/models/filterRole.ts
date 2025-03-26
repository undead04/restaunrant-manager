import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";
export interface IRoleFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
