import axios from 'axios';
import { DEFAULT_PAGE_SIZE, GOOLE_BOOKS_API } from '../config';
import { IBook, IGoogleBook } from '../interfaces/book';
import { Pagination, PageModel } from '../interfaces/page';
import { generatePageObject } from '../util';

async function searchBooks(search: string = '', pagination?: Partial<Pagination>): Promise<PageModel<IBook>> {
  const page = pagination?.page || 0;
  const size = pagination?.size || DEFAULT_PAGE_SIZE;

  const { data } = await axios.get<IGoogleBook>(GOOLE_BOOKS_API, {
    params: { q: search, startIndex: page * size, maxResults: size },
  });

  const books = data.items.map<IBook>((item) => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(', ') || '',
    publisher: item.volumeInfo.publisher || '',
    categories: item.volumeInfo.categories || [],
  }));

  return generatePageObject(books, page, size, data.totalItems);
}

export default {
  searchBooks,
};
