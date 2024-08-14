import express from 'express';
import CheckAuth from '../../Middleware/CheckAuth';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { UserController } from './User.controller';
import { UserValidation } from './User.validation';

const router = express.Router();

//! Create New user
router.post(
  '/create-user',
  ValidateRequest(UserValidation.RegisterUser),
  UserController.RegisterUserToDb,
);

//! get all users
router.get(
  '/get-users',
  CheckAuth('Admin', 'Super_Admin'),
  UserController.GetAllUsers,
);

//! verify email
router.post(
  '/verify-email',
  ValidateRequest(UserValidation.verifyEmailValidation),
  UserController.VerifyEmail,
);

//! request for new verification code
router.post(
  '/request-verification-code',
  ValidateRequest(UserValidation.requestNewOtpValidation),
  UserController.RequestVerificationCode,
);

//! get user Profile
router.get(
  '/get-user-profile',
  CheckAuth('Admin', 'Super_Admin', 'User'),
  UserController.GetUserProfile,
);

//! change role
router.put(
  '/change-role/:id',
  CheckAuth('Super_Admin', 'Admin'),
  ValidateRequest(UserValidation.changeRoleValidation),
  UserController.changeRole,
);

//refresh token route
router.post(
  '/refresh-token',
  // validateRequest(UserValidation.refreshTokenValidationSchema),
  UserController.RefreshToken,
);

export const UserRoutes = router;
