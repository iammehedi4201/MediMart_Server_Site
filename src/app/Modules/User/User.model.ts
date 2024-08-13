import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser } from './User.interface';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    roles: {
      type: String,
      enum: ['User', 'Admin', 'Super_Admin'],
      default: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: '',
    },
    expirationTime: {
      type: Date,
      default: new Date(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

export const User = model<IUser>('User', UserSchema);
