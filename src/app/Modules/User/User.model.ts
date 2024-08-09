import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { IUser, UserModel } from './User.interface';

const UserSchema = new Schema<IUser, UserModel>(
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
      enum: ['User', 'Admin', 'Super-Admin'],
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

//check if password is correct
UserSchema.static(
  'isPasswordCorrect',
  async function (password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  },
);

export const User = model<IUser, UserModel>('User', UserSchema);
