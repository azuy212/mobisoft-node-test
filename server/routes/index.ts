import { Request, Router } from 'express';
import { IUser } from '../interfaces/user';
import Database from '../database';
import UserRoutes from './user.route';
import BookRoutes from './book.route';

Database.getInstance().connect();

const router = Router();

router.use(UserRoutes);
router.use('/books', BookRoutes);

export interface IUserRequest extends Request {
  user?: IUser;
}

export default router;
