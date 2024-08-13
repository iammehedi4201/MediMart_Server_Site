import { model, Schema } from 'mongoose';
import { ICategory } from './Categories.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: [true, 'category name is required'] },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Category = model<ICategory>('Category', categorySchema);
