import { Schema, model } from 'mongoose';
import { TAdmin } from './Admin.interface';

const adminSchema = new Schema<TAdmin>(
  {
    name: {
      firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
      },
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Please enter your contact number'],
      trim: true,
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

export const Admin = model<TAdmin>('Admin', adminSchema);
