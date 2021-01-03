import API from './handlers/base.service';
import { IBook } from '../../interfaces/book';
import { PageModel, Pagination } from '../../interfaces/page';

export default class BooksAPI {
  private static instance: BooksAPI;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new BooksAPI();
    }
    return this.instance;
  }

  public async listBooks(search: string, { page, size }: Pagination) {
    return API.get<PageModel<IBook>>('books', { params: { search, page, size } });
  }

  public async listGoogleBooks(search: string, pagination?: Pagination) {
    return API.get<PageModel<IBook>>('books/google', { params: { search, ...pagination } });
  }
}
