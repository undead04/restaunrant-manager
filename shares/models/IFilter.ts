export interface IFilterPagination {
  page?: number;
  pageSize?: number;
}
export interface IFilterSort {
  orderBy?: string;
  sort?: TypeSort;
}
export enum TypeSort {
  "DESC",
  "ASC",
}
