import {
  IFilterPagination,
  IFilterSort,
} from "../../../../shared/models/IFilter";
export interface IRoleFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
