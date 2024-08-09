import { Router } from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { AuthController } from './Auth.controller';
import { UserValidation } from '../User/User.validation';

const router = Router();

//: Login User
router.post(
  '/login',
  ValidateRequest(UserValidation.UserLoginSchema),
  AuthController.LoginUser,
);

export const Authroutes = router;
