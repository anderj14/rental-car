export interface Pagination<T> {
  map(arg0: (invoice: any) => any): any;
  pageIndex: number
  pageSize: number
  count: number
  data: T;
}
