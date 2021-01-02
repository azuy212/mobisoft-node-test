import { ParsedQs } from 'qs';
import { PageModel, Pagination } from '../interfaces/page';

/**
 * Source: https://stackoverflow.com/a/7616484/6161930
 */
export function generateHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
}

type QueryParam = string | ParsedQs | Array<string | ParsedQs>;

export function parsePaginationQueryParams(page?: QueryParam, size?: QueryParam) {
  const pagination: Partial<Pagination> = {};
  if (page) {
    pagination.page = +page;
  }
  if (size) {
    pagination.size = +size;
  }
  return pagination;
}

export function generatePageObject<T>(
  content: T[],
  page: number,
  size: number,
  totalElements: number,
): PageModel<T> {
  const totalPages = Math.ceil(totalElements / size);
  return {
    content,
    first: page === 0,
    last: page === totalPages - 1,
    number: page + 1,
    numberOfElements: content.length,
    size,
    totalElements,
    totalPages,
  };
}
