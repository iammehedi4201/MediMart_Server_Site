import config from '../../config';
import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { UserService } from './User.service';

//! Create New User
const RegisterUserToDb = CatchAsync(async (req, res) => {
  const result = await UserService.RegisterUserToDB(req.body);
  const { user } = result;
  const { email, refreshToken, token, name } = user;

  //send refresh token as a cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production', // set to true in production HTTPS only
    httpOnly: true, //to disable accessing cookie via  using javascript
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Register Successfully',
    data: {
      name,
      email,
      token,
    },
  });
});

//! verify email
const VerifyEmail = CatchAsync(async (req, res) => {
  const { email, verificationCode } = req.body;
  const result = await UserService.VerifyEmail(email, verificationCode);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Email verified successfully',
    data: result,
  });
});

//! request for new verification code
const RequestVerificationCode = CatchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await UserService.RequestVerificationCode(email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Verification code sent successfully',
    data: result,
  });
});

//! Refresh Token
const RefreshToken = CatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.RefreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access Token Refreshed Successfully',
    data: result,
  });
});

//! Create New Admin
// const RegisterAdminToDB = CatchAsync(async (req, res) => {
//   const { password, admin: adminData } = req.body;
//   const result = await UserService.RegisterAdminToDB(password, adminData);
//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: 'User Register Successfully',
//     data: result.user,
//   });
// });

export const UserController = {
  RegisterUserToDb,
  VerifyEmail,
  RequestVerificationCode,
  RefreshToken,
};
