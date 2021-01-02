import mongoose from 'mongoose';
import BookController from '../controllers/book.controller';
import UserController from '../controllers/user.controller';
import GoogleBookController from '../controllers/google-book.controller';
import { DATABASE_URI } from '../config';
import { IBook } from '../interfaces/book';
import { Pagination } from '../interfaces/page';
import { IUser } from '../interfaces/user';
import { generateHash } from '../util';

export default class Database {
  private static instance: Database;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  public async connect() {
    return mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  public async saveUser(user: IUser) {
    const hashedPassword = generateHash(user.password);

    return UserController.registerUser({ ...user, password: hashedPassword });
  }

  public async getUser({ email, password }: Pick<IUser, 'email' | 'password'>) {
    const hashedPassword = generateHash(password);

    return UserController.getUser({ email, password: hashedPassword });
  }

  public async getUserByEmail(email: string) {
    return UserController.getUserByEmail(email);
  }

  public async saveBook(book: IBook) {
    return BookController.createBook(book);
  }

  public async listBooks(search?: string, pagination?: Partial<Pagination>) {
    return BookController.searchBooks(search, pagination);
  }

  public async listGoogleBooks(search?: string, pagination?: Partial<Pagination>) {
    return GoogleBookController.searchBooks(search, pagination);
  }
}
