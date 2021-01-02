import mongoose, { Schema } from 'mongoose';
import { IBookDocument } from '../interfaces/book';

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  categories: [String],
  publisher: String,
});

export default mongoose.model<IBookDocument>('Book', BookSchema);
