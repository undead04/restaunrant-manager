import {
  IFilterPagination,
  IFilterSort,
} from "../../../../shared/models/IFilter";

export interface ITableDistFiler extends IFilterPagination, IFilterSort {
  search?: string;
  status?: boolean;
}
