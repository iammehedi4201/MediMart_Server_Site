import express from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { UserValidation } from './User.validation';
import { UserController } from './User.controller';

const router = express.Router();

//! Create New user
router.post(
  '/create-user',
  ValidateRequest(UserValidation.RegisterUser),
  UserController.RegisterUserToDb,
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

//! Create New Admin
// router.post(
//   '/create-admin',
//   CheckAuth('Admin', 'Super_Admin'),
//   ValidateRequest(UserValidation.RegisterAdminSchema),
//   UserController.RegisterAdminToDB,
// );

export const UserRoutes = router;
