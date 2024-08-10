import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { AuthService } from './Auth.service';

const LoginUser = CatchAsync(async (req, res) => {
  const result = await AuthService.LoginUserToDb(req.body);
  sendResponse(res, {
    message: 'User Logged In Successfully',
    success: true,
    statusCode: 200,
    data: result,
  });
});

export const AuthController = {
  LoginUser,
};
