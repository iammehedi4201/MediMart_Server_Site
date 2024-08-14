/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { userRoles } from './User.constant';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  photo: string;
  roles: 'Admin' | 'Super_Admin' | 'User';
  verificationCode: string;
  expirationTime: Date;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface IJwtPayload {
  id: mongoose.Types.ObjectId;
  email: string;
  role: string;
}

export type TUserRoles = keyof typeof userRoles;
