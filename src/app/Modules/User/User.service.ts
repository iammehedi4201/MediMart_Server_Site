/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../Helpers/AppError';
import sendEmail from '../../Utils/SendEmail';
import CreateAccessToken from '../Auth/Auth.utils';
import { IJwtPayload, IUser } from './User.interface';
import { User } from './User.model';

//! Register User to DB
const RegisterUserToDB = async (userData: IUser) => {
  //:check if user already exists
  const isUserExist = await User.findOne({ email: userData?.email });
  if (isUserExist) {
    throw new AppError('User already exists', 400);
  }

  const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
  const expirationTime = new Date(Date.now() + 59 * 1000); // 59 seconds from now

  // Save verification code and expiration time to the user record
  userData.verificationCode = verificationCode;
  userData.expirationTime = expirationTime;

  const newUser = await User.create(userData);

  // email html
  const emailHtml = `
  <html>
    <body style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Email Verification</h2>
        <p style="color: #555;">Please use the following verification code to verify your email address:</p>
        <h1 style="color: #333; text-align: center;">${verificationCode}</h1>
        <p style="color: #555;">If you did not request this code, please ignore this email.</p>
      </div>
    </body>
  </html>
`;

  // send verification code to user email
  await sendEmail(newUser.email, 'Verification code', emailHtml);

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

//! Verify Email
const VerifyEmail = async (email: string, verificationCode: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.verificationCode !== verificationCode) {
    throw new AppError('Invalid verification code', 400);
  }

  if (user.expirationTime < new Date()) {
    throw new AppError('Verification code expired', 400);
  }

  user.isVerified = true;
  user.verificationCode = '';
  user.expirationTime = new Date();

  await user.save();

  return {
    message: 'Email verified successfully',
  };
};

//! Request Verification Code
const RequestVerificationCode = async (email: string) => {
  //:check if user already exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
  const expirationTime = new Date(Date.now() + 59 * 1000); // 59 seconds from now

  // Save verification code and expiration time to the user record
  user.verificationCode = verificationCode;
  user.expirationTime = expirationTime;

  await user.save();

  // email html
  const emailHtml = `
  <html>
    <body style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Email Verification</h2>
        <p style="color: #555;">Please use the following verification code to verify your email address:</p>
        <h1 style="color: #333; text-align: center;">${verificationCode}</h1>
        <p style="color: #555;">If you did not request this code, please ignore this email.</p>
      </div>
    </body>
  </html>
`;

  // send verification code to user email
  await sendEmail(user.email, 'Verification code', emailHtml);

  return {
    message: 'Verification code sent successfully',
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

export const UserService = {
  RegisterUserToDB,
  VerifyEmail,
  RequestVerificationCode,
};
