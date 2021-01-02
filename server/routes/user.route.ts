import { Router } from 'express';
import Database from '../database';
import { ACCESS_TOKEN_SECRET } from '../config';
import jwt from 'jsonwebtoken';

const router = Router();

const database = Database.getInstance();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (database.getUserByEmail(email)) {
      return res.status(403).json({ message: `User with email '${email}' already exists` });
    }

    const user = await database.saveUser({ name, email, password });
    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await database.getUser({ email, password });
  console.log('user', user);
  if (!user) {
    return res.status(403).json({ message: 'Email or Password is incorrect' });
  }
  const accessToken = jwt.sign({ email, password }, ACCESS_TOKEN_SECRET);

  res.json({ jwt: accessToken });
});

export default router;
