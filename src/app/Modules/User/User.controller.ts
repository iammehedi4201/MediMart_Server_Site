import CatchAsync from '../../Utils/CatchAsync';
import sendResponse from '../../Utils/SendResponse';
import { UserService } from './User.service';

//! Create New Customer
const RegisterUserToDb = CatchAsync(async (req, res) => {
  const result = await UserService.RegisterUserToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Register Successfully',
    data: result.user,
  });
});

//! Create New Admin
const RegisterAdminToDB = CatchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserService.RegisterAdminToDB(password, adminData);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Register Successfully',
    data: result.user,
  });
});

export const UserController = {
  RegisterUserToDb,
  RegisterAdminToDB,
};
