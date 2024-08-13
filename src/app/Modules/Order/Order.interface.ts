import mongoose from 'mongoose';

export interface IShippingAddress {
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
}

export interface IOrder {
  user: mongoose.Schema.Types.ObjectId; // Reference to the User
  products: {
    product: mongoose.Schema.Types.ObjectId; // Reference to the Product
    variant: mongoose.Schema.Types.ObjectId; // Reference to the Variant
    quantity: number;
    price: number;
  }[];
  shippingAddress: IShippingAddress;
  totalAmount: number;
  status: 'pending' | 'processed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
