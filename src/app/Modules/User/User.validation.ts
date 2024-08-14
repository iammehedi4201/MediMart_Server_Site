import z from 'zod';

const RegisterUser = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'must be at least 6 characters long' })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'must contain at least one uppercase letter',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'must contain at least one lowercase letter',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'must contain at least one number',
      }),
    photo: z.string(),
  }),
});

const requestNewOtpValidation = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const verifyEmailValidation = z.object({
  body: z.object({
    email: z.string().email(),
    verificationCode: z.string(),
  }),
});

const changeRoleValidation = z.object({
  body: z.object({
    role: z
      .string()
      .refine((role) => ['Admin', 'User', 'Super_Admin'].includes(role), {
        message: 'Role must be Admin, User or Super_Admin',
      }),
  }),
});

// const refreshTokenValidationSchema = z.object({
//   cookies: z.object({
//     refreshToken: z.string({
//       required_error: 'Refresh Token is required',
//     }),
//   }),
// });

export const UserValidation = {
  RegisterUser,
  verifyEmailValidation,
  requestNewOtpValidation,
  changeRoleValidation,
};
