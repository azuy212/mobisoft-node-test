import User from '../models/user.model';
import { IUser } from '../interfaces/user';

async function registerUser(user: IUser) {
  return User.create({ ...user });
}

async function getUser({ email, password }: Pick<IUser, 'email' | 'password'>) {
  return User.findOne({ email, password });
}

async function getUserByEmail(email: string) {
  return User.findOne({ email });
}

export default {
  registerUser,
  getUser,
  getUserByEmail,
};
