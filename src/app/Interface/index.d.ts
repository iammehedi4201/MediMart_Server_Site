import { IJWTPayload } from '../Modules/Auth/Auth.interface';

declare global {
  namespace Express {
    interface Request {
      user: IJWTPayload;
    }
  }
}
