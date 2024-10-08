import config from '../../config';
import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { AuthService } from './Auth.service';

const LoginUser = CatchAsync(async (req, res) => {
  const result = await AuthService.LoginUserToDb(req.body);
  const { token, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'development',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    message: 'User Logged In Successfully',
    success: true,
    statusCode: 200,
    data: {
      token,
    },
  });
});

export const AuthController = {
  LoginUser,
};
