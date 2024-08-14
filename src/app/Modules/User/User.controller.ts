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

//! get all users
const GetAllUsers = CatchAsync(async (req, res) => {
  const result = await UserService.GetAllUsers(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All Users',
    meta: result.meta,
    data: result.data,
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

//! get user Profile
const GetUserProfile = CatchAsync(async (req, res) => {
  const { email } = req.query;

  const result = await UserService.GetUserProfile(email as string);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Profile',
    data: result,
  });
});

//! change user role
const changeRole = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserService.ChangeRole(id, role);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Role Updated Successfully',
    data: result,
  });
});

//! delete user
const DeleteUser = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.DeleteUser(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User Deleted Successfully',
    data: result,
  });
});

//! Refresh Token
const RefreshToken = CatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('refreshToken', refreshToken);

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
  GetAllUsers,
  VerifyEmail,
  RequestVerificationCode,
  GetUserProfile,
  RefreshToken,
  changeRole,
  DeleteUser,
};
