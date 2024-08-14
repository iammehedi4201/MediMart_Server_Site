import mongoose, { model, Schema } from 'mongoose';
import { IProduct } from './Product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please enter product slug'],
      unique: true,
      trim: true,
    },
    photos: [
      {
        type: String,
        required: [true, 'Please enter product photos'],
        trim: true,
      },
    ],
    description: {
      type: String,
      required: [true, 'Please enter product description'],
      trim: true,
    },
    metaKey: {
      type: String,
      required: [true, 'Please enter product meta key'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      trim: true,
    },
    discount: {
      type: Number,
      required: [true, 'Please enter product discount'],
      default: 0,
    },
    stockStatus: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter product quantity'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    categories: {
      primary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      secondary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      tertiary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
    company: {
      type: String,
      required: [true, 'Please enter product company'],
      trim: true,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model<IProduct>('Product', productSchema);
