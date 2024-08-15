/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

interface Category {
  _id: Types.ObjectId;
}

interface Variant {
  _id: Types.ObjectId;
}

export interface IProduct {
  toObject: any;
  name: string;
  slug: string;
  photos?: string[];
  description?: string;
  metaKey?: string;
  price: number;
  discount?: number;
  stockStatus?: boolean;
  quantity: number;
  status?: 'active' | 'inactive';
  categories: {
    primary?: Category;
    secondary?: Category;
    tertiary?: Category;
  };
  variants?: Variant[];
  company: string;
  isDeleted: boolean;
}
