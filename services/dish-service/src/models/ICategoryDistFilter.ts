import {
  IFilterPagination,
  IFilterSort,
} from "../../../../shared/models/IFilter";

export interface ICategoryDistFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
