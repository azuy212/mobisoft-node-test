import jwt from 'jsonwebtoken';
import { RequestHandler, Router } from 'express';
import { IUserRequest } from '.';
import { parsePaginationQueryParams } from '../util';
import { ACCESS_TOKEN_SECRET } from '../config';
import { IUser } from '../interfaces/user';
import Database from '../database';

const router = Router();

const verifyJWT: RequestHandler = (req: IUserRequest, res, next) => {
  const header = req.get('authorization');
  const accessToken = header && header.split('Bearer ')[1];

  if (accessToken) {
    const user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    req.user = user as IUser;
    return next();
  }
  res.sendStatus(401);
};

const database = Database.getInstance();

router.post('/', verifyJWT, async (req, res) => {
  const { title, author, categories, publisher } = req.body;

  if (!title || !author || !categories || !publisher) {
    return res.status(400).json({ message: 'Please provide all required attributes' });
  }

  try {
    const book = await database.saveBook({ title, author, categories, publisher });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', verifyJWT, async (req, res) => {
  const { search, page, size } = req.query;

  try {
    const books = await database.listBooks(search?.toString(), parsePaginationQueryParams(page, size));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/google', async (req, res) => {
  const { search, page, size } = req.query;

  if (!search) {
    return res.status(400).json({ message: 'Search field is required' });
  }

  try {
    const books = await database.listGoogleBooks(search?.toString(), parsePaginationQueryParams(page, size));
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
