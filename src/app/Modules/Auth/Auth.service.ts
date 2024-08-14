import bcrypt from 'bcrypt';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../../Helpers/AppError';
import { IJwtPayload, IUser } from '../User/User.interface';
import { User } from '../User/User.model';
import { ILoginUser } from './Auth.interface';
import CreateAccessToken from './Auth.utils';
import config from '../../config';

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

  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payLoad.password,
    user.password,
  ); // true

  if (!isPasswordCorrect) {
    throw new AppError('Password is incorrect', 400);
  }

  //check if user is verified
  if (!user?.isVerified) {
    throw new AppError('Email is Verified First Verify the email', 400);
  }

  console.log('Role', user?.roles);

  //create access token
  const jwtPayload: IJwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.roles,
  };

  // create access token
  const accessToken = await CreateAccessToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  // create refresh token
  const refreshToken = await CreateAccessToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return {
    token: accessToken,
    refreshToken,
  };
};

export const AuthService = {
  LoginUserToDb,
};
