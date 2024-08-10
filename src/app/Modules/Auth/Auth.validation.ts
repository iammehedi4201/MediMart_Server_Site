import { z } from 'zod';

const UserLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const authValidation = {
  UserLoginSchema,
};
