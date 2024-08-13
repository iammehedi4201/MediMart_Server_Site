import z from 'zod';

//! Create Product Validation Schema
const CreateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().trim(),
    slug: z.string().trim(),
    photos: z.array(z.string().trim()),
    description: z.string().trim(),
    metaKey: z.string().trim(),
    price: z.number().nonnegative('Please enter a valid product price'),
    discount: z
      .number()
      .nonnegative('Please enter a valid product discount')
      .default(0),
    stockStatus: z.boolean().default(true),
    quantity: z.number().nonnegative('Please enter a valid product quantity'),
    status: z.enum(['active', 'inactive']).default('active'),
    categories: z
      .object({
        primary: z.string().optional(),
        secondary: z.string().optional(),
        tertiary: z.string().optional(),
      })
      .optional(),
    variants: z.array(z.string()).optional(),
    company: z.string().trim(),
    defaultPrice: z
      .number()
      .nonnegative('Please enter a valid product default price'),
  }),
});

//! Update Product Validation
const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty('Please enter product name').optional(),
    slug: z.string().trim().nonempty('Please enter product slug').optional(),
    photos: z
      .array(z.string().trim().nonempty('Please enter product photos'))
      .optional(),
    description: z
      .string()
      .trim()
      .nonempty('Please enter product description')
      .optional(),
    metaKey: z
      .string()
      .trim()
      .nonempty('Please enter product meta key')
      .optional(),
    price: z
      .number()
      .nonnegative('Please enter a valid product price')
      .optional(),
    discount: z
      .number()
      .nonnegative('Please enter a valid product discount')
      .default(0)
      .optional(),
    stockStatus: z.boolean().default(true).optional(),
    quantity: z.number().optional(),
    status: z.enum(['active', 'inactive']).default('active').optional(),
    categories: z
      .object({
        primary: z.string().optional(),
        secondary: z.string().optional(),
        tertiary: z.string().optional(),
      })
      .optional(),
    variants: z.array(z.string()).optional(),
    company: z.string().trim().optional(),
    defaultPrice: z
      .number()
      .nonnegative('Please enter a valid product default price')
      .optional(),
  }),
});

export const ProductValidation = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};
