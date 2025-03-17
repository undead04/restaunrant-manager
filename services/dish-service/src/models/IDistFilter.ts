import {
  IFilterPagination,
  IFilterSort,
} from "../../../../shared/models/IFilter";

export interface IDistFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
