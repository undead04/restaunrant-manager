import {
  IFilterPagination,
  IFilterSort,
} from "../../../../shared/models/IFilter";
export interface IUserFilter extends IFilterPagination, IFilterSort {
  search?: string;
}
