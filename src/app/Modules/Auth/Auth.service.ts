import bcrypt from 'bcrypt';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../../Helpers/AppError';
import { IJwtPayload, IUser } from '../User/User.interface';
import { User } from '../User/User.model';
import { ILoginUser } from './Auth.interface';
import CreateAccessToken from './Auth.utils';

const LoginUserToDb = async (payLoad: ILoginUser) => {
  //check if user exists
  const user = (await User.findOne({ email: payLoad?.email })) as IUser;

  if (!user) {
    throw new AppError('User does not exist', 400);
  }

  //check if user is deleted
  if (user?.isDeleted) {
    throw new AppError('User is deleted', 400);
  }

  //check if password is correc
  const isPasswordCorrect = bcrypt.compare(payLoad?.password, user?.password);

  if (!isPasswordCorrect) {
    throw new AppError('Password is incorrect', 400);
  }

  //check if user is verified
  if (!user?.isVerified) {
    throw new AppError('Email is Verified First Verify the email', 400);
  }

  //create access token
  const jwtPayload: IJwtPayload = {
    email: user?.email,
    role: user?.roles,
  };

  const accessToken = await CreateAccessToken(jwtPayload);

  return {
    accessToken: accessToken,
  };
};

export const AuthService = {
  LoginUserToDb,
};
