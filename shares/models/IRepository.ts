export interface IRepository<T> {
  create(item: T): Promise<void | T>;
  getById(id: number | string): Promise<T | null>;
  delete(id: number | string): Promise<void>;
  getAll(): Promise<T[] | null>;
  update(record: T, item: Partial<T>): Promise<void | T>;
  getByField(values: string | number, column: string): Promise<T | null>;
}
