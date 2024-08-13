import { TUserRoles } from './../Modules/User/User.interface';
import jwt from 'jsonwebtoken';
import AppError from '../Helpers/AppError';
import JWTError from '../Helpers/JwtError';
import CatchAsync from '../Utils/CatchAsync';
import config from '../config';
import { IJwtPayload } from '../Modules/User/User.interface';
import { User } from '../Modules/User/User.model';

const CheckAuth = (...requireRoles: TUserRoles[]) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new JWTError('Token not found', 401);
    }
    //check if token is valid
    const decode = jwt.verify(
      token,
      config.jwt_access_token_secret as string,
      function (err, decoded) {
        if (err) {
          throw new JWTError('Unauthorized Access', 401);
        }
        return decoded;
      },
    );
    const { email, role } = decode as unknown as IJwtPayload;

    console.log('role', role);

    //check if user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    //check if user is deleted or not
    if (user?.isDeleted) {
      throw new AppError('User is deleted', 403);
    }

    //check if the user role is allowed to access the route
    if (requireRoles && !requireRoles.includes(role as TUserRoles)) {
      throw new AppError('You have No Permission to Access This route', 401);
    }

    req.user = decode as unknown as IJwtPayload;
    next();
  });
};

export default CheckAuth;
