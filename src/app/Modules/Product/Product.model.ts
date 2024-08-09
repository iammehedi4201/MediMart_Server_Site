import { Schema, model } from 'mongoose';
import { IProduct } from './Product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    productId: {
      type: String,
      required: [true, 'Please enter product id'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter product quantity'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Please enter product model'],
      trim: true,
    },
    style: {
      type: String,
      required: [true, 'Please enter product style'],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, 'Please enter product size'],
    },
    color: {
      type: String,
      required: [true, 'Please enter product color'],
      trim: true,
    },
    material: {
      type: String,
      required: [true, 'Please enter product material'],
      trim: true,
    },
    closure_Type: {
      type: String,
      required: [true, 'Please enter product closure type'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please enter product image'],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model<IProduct>('Product', ProductSchema);
