import z from 'zod';

const CreateProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    brand: z.string(),
    model: z.string(),
    style: z.string(),
    size: z.number(),
    color: z.string(),
    material: z.string(),
    closure_Type: z.string(),
    image: z.string(),
  }),
});

const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    style: z.string().optional(),
    size: z.number().optional(),
    color: z.string().optional(),
    material: z.string().optional(),
    closure_Type: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const ProductValidation = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};
