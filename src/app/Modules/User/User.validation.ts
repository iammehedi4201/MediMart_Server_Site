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

const adminValidationSchema = z.object({
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  email: z.string().email(),
  contactNo: z.string(),
});

const RegisterAdminSchema = z.object({
  body: z
    .object({
      password: z
        .string()
        .min(6, { message: 'must be at least 6 characters long' })
        .refine((password) => /[A-Z]/.test(password), {
          message: ' must contain at least one uppercase letter',
        })
        .refine((password) => /[a-z]/.test(password), {
          message: ' must contain at least one lowercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
          message: 'must contain at least one number',
        }),
      confirmPassword: z
        .string()
        .min(6, { message: 'must be at least 6 characters long' })
        .refine((password) => /[A-Z]/.test(password), {
          message: ' must contain at least one uppercase letter',
        })
        .refine((password) => /[a-z]/.test(password), {
          message: ' must contain at least one lowercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
          message: 'must contain at least one number',
        }),
      customer: adminValidationSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confrimPassword'],
    }),
});

const UserLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const UserValidation = {
  RegisterUser,
  RegisterAdminSchema,
  UserLoginSchema,
};
