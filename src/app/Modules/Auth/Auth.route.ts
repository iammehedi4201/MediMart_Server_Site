import { Router } from 'express';
import ValidateRequest from '../../Middleware/ValidationRequest';
import { AuthController } from './Auth.controller';
import { authValidation } from './Auth.validation';

const router = Router();

//: Login User
router.post(
  '/login',
  ValidateRequest(authValidation.UserLoginSchema),
  AuthController.LoginUser,
);

export const Authroutes = router;
