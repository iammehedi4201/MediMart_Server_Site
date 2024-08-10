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
    roles: z.enum(['User', 'Admin', 'Super-Admin']),
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

export const UserValidation = {
  RegisterUser,
  verifyEmailValidation,
  requestNewOtpValidation,
};
