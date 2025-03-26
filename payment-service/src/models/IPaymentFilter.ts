import { IFilterPagination, IFilterSort } from "@shares/models/IFilter";
export interface IPaymentFilter extends IFilterSort, IFilterPagination {
  from?: Date;
  to?: Date;
}
