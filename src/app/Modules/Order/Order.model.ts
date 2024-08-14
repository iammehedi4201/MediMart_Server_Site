import { model, Schema } from 'mongoose';
import { IOrder, IShippingAddress } from './Order.interface';

export const shippingAddressSchema = new Schema<IShippingAddress>({
  division: {
    type: String,
    required: [true, 'Please Enter Division'],
    trim: true,
  },
  district: {
    type: String,
    required: [true, 'Please Enter District'],
    trim: true,
  },
  subDistrict: {
    type: String,
    required: [true, 'Please Enter Sub District'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please Enter Address'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please Enter Your phone'],
    trim: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product is required'],
        },
        variant: {
          type: Schema.Types.ObjectId,
          ref: 'Variant',
          required: false, // Allow variant to be optional
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required'],
        },
        price: {
          type: Number,
          required: [true, 'Price is required'],
        },
      },
    ],
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, 'Shipping address is required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
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

export const Order = model<IOrder>('Order', orderSchema);
