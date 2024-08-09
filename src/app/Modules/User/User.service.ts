/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../Helpers/AppError';
import sendEmail from '../../Utils/SendEmail';
import CreateAccessToken from '../Auth/Auth.utils';
import { IJwtPayload, IUser } from './User.interface';
import { User } from './User.model';
import { v4 as uuidv4 } from 'uuid';

//! Register Customer to DB
const RegisterUserToDB = async (userData: IUser) => {
  //:check if user already exists
  const isUserExist = await User.findOne({ email: userData?.email });
  if (isUserExist) {
    throw new AppError('User already exists', 400);
  }

  const verificationCode = uuidv4();
  const expirationTime = new Date(Date.now() + 59 * 1000); // 59 seconds from now

  // Save verification code and expiration time to the user record
  userData.verificationCode = verificationCode;
  userData.expirationTime = expirationTime;

  const newUser = await User.create(userData);

  await sendEmail(newUser.email, verificationCode);

  //create access token
  const jwtPayload: IJwtPayload = {
    email: newUser.email,
    role: newUser.roles,
  };

  // create access token
  const accessToken = await CreateAccessToken(jwtPayload);

  return {
    user: {
      name: newUser?.name,
      email: newUser?.email,
      verificationCode: newUser?.verificationCode,
      token: accessToken,
    },
  };
};

//! Register Admin To DB
// const RegisterAdminToDB = async (password: string, adminData: TAdmin) => {
//   //:Create user object
//   const userData: Partial<IUser> = {};

//   //:check if user already exists
//   const isUserExist = await User.findOne({ email: adminData?.email });
//   if (isUserExist) {
//     throw new AppError('User already exists', 400);
//   }

//   //: check if seller is already exists
//   const isSellerExist = await Admin.findOne({ email: adminData?.email });
//   if (isSellerExist) {
//     throw new AppError('Seller already exists', 400);
//   }

//   //: transaction
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     //: create customer
//     const newAdmin = await Seller.create([adminData], { session });

//     //: Assaign value user object
//     userData.userId = newAdmin[0]._id;
//     userData.email = adminData.email;
//     userData.password = password;
//     userData.role = 'Admin';

//     //: create user
//     const newUser = await User.create([userData], { session });

//     //create access token
//     const jwtPayload: IJwtPayload = {
//       email: newUser[0]?.email,
//       role: newUser[0]?.role,
//     };

//     const accessToken = await CreateAccessToken(jwtPayload);

//     await session.commitTransaction();
//     session.endSession();

//     return {
//       user: {
//         name: adminData?.name?.firstName + ' ' + adminData?.name?.lastName,
//         email: adminData?.email,
//         token: accessToken,
//       },
//     };
//   } catch (error: any) {
//     await session.abortTransaction();
//     session.endSession();
//     throw new AppError(`Unable to register user: ${error.message}`, 500);
//   }
// };

export const UserService = { RegisterUserToDB };
