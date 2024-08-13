import z from 'zod';

const createVarientsSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number().positive(),
  }),
});

const updateVarientsSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
  }),
});

export const VarientValidation = {
  createVarientsSchema,
  updateVarientsSchema,
};
