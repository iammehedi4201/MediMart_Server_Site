import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  default_password: process.env.DEFAULT_PASSWORD as string,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_token_secret: process.env.JWT_ACCESS_SECRET_KEY,
  jwt_access_token_expires_in: process.env.ACCESS_TOKEN_EXPIERY,
  jwt_refresh_token_secret: process.env.JWT_REFRESH_SECRET_KEY,
  jwt_refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIERY,
  sendEmail: {
    email_service: process.env.EMAIL_SERVICE,
    email: process.env.EMAIL,
    app_password: process.env.APP_PASS,
  },
};
