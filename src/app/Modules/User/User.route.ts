import express from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { UserValidation } from './User.validation';
import { UserController } from './User.controller';
import CheckAuth from '../../Middleware/CheckAuth';

const router = express.Router();

//! Create New user
router.post(
  '/create-user',
  ValidateRequest(UserValidation.RegisterUser),
  UserController.RegisterUserToDb,
);

//! Create New Admin
router.post(
  '/create-admin',
  CheckAuth('Admin', 'Super_Admin'),
  ValidateRequest(UserValidation.RegisterAdminSchema),
  UserController.RegisterAdminToDB,
);

export const UserRoutes = router;
