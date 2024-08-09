/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../../Helpers/AppError';
import { IJwtPayload } from '../User/User.interface';
import { User } from '../User/User.model';
import { ILoginUser } from './Auth.interface';
import CreateAccessToken from './Auth.utils';

const LoginUserToDb = async (payLoad: ILoginUser) => {
  //check if user exists
  const user = await User.findOne({ email: payLoad?.email });

  if (!user) {
    throw new AppError('User does not exist', 400);
  }

  //check if user is blocked
  if (user?.status === 'blocked') {
    throw new AppError('User is blocked', 400);
  }

  //check if user is deleted
  if (user?.isDeleted) {
    throw new AppError('User is deleted', 400);
  }

  //check if password is correct
  if (!(await User.isPasswordCorrect(payLoad?.password, user?.password))) {
    throw new AppError('Password is incorrect', 400);
  }

  //create access token
  const jwtPayload: IJwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = await CreateAccessToken(jwtPayload);

  return {
    accessToken: accessToken,
  };
};

export const AuthService = {
  LoginUserToDb,
};
