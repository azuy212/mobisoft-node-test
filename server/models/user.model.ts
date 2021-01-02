import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/user';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUserDocument>('User', UserSchema);
