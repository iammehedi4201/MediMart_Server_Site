import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../User/User.interface';

const CreateAccessToken = async (
  payLoad: IJwtPayload,
  tokenSecret: string,
  expiresIn: string,
) => {
  const accessToken = jwt.sign(payLoad, tokenSecret, {
    expiresIn,
  });

  return accessToken;
};

export default CreateAccessToken;
