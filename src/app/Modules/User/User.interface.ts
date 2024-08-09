/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRoles } from './User.constant';
export interface IUser {
  name: string;
  email: string;
  password: string;
  photo: string;
  roles: 'Admin' | 'Super-Admin' | 'User';
  verificationCode: string;
  expirationTime: Date;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface IJwtPayload {
  email: string;
  role: string;
}

export type TUserRoles = keyof typeof userRoles;

export interface UserModel extends Model<IUser> {
  isPasswordCorrect: (
    password: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}
