import z from 'zod';

const CreateCategorySchema = z.object({
  body: z.object({
    name: z.string(),
    slug: z.string(),
    thumbnail: z.string(),
  }),
});

const UpdateCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const CategoriesValidation = {
  CreateCategorySchema,
  UpdateCategorySchema,
};
