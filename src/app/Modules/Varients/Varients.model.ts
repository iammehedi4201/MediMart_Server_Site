import { model, Schema } from 'mongoose';
import { IVarients } from './Varients.interface';

const variantSchema = new Schema<IVarients>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Variant = model<IVarients>('Variant', variantSchema);
