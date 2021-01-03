export interface PageModel<T> {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}

export interface Pagination {
  page: number;
  size: number;
}
