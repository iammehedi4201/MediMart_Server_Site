import { userRoles } from '../Modules/User/User.constant';
import { User } from '../Modules/User/User.model';

const superUser = {
  name: {
    firstName: 'Mehedi',
    lastName: 'Hasan',
  },
  email: 'iammehedi296@gmail.com',
  password: 'Hasan586258',
  role: userRoles.Super_Admin,
  status: 'active',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperUserExist = await User.findOne({ email: superUser.email });
  if (!isSuperUserExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
