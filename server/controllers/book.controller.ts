import { FilterQuery } from 'mongoose';
import Book from '../models/book.model';
import { IBook, IBookDocument } from '../interfaces/book';
import { PageModel, Pagination } from '../interfaces/page';
import { generatePageObject } from '../util';
import { DEFAULT_PAGE_SIZE } from '../config';

async function createBook(book: IBook) {
  return Book.create({ ...book });
}

async function searchBooks(
  search: string = '',
  pagination?: Partial<Pagination>,
): Promise<PageModel<IBookDocument>> {
  const page = pagination?.page || 0;
  const size = pagination?.size || DEFAULT_PAGE_SIZE;

  const searchRegex = new RegExp(search, 'i');
  const filterQuery: FilterQuery<IBookDocument> = {
    $or: [
      { title: searchRegex },
      { author: searchRegex },
      { publisher: searchRegex },
      { categories: searchRegex },
    ],
  };
  const bookDocuments = await Book.find(filterQuery, null, { skip: page * size, limit: size });
  const totalElements = await Book.countDocuments(filterQuery);

  return generatePageObject(bookDocuments, page, size, totalElements);
}

export default {
  createBook,
  searchBooks,
};
