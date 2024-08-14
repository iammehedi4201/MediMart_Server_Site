import { z } from 'zod';

const shippingAddressSchema = z.object({
  division: z.string(),
  district: z.string(),
  subDistrict: z.string(),
  address: z.string(),
  name: z.string(),
  phone: z.string(),
});

const productSchema = z.object({
  product: z.string(),
  variant: z.string().nullable(), // Allow variant to be null or empty string
  quantity: z.number(),
  price: z.number(),
});

const orderSchema = z.object({
  body: z.object({
    user: z.string(),
    products: z.array(
      productSchema.transform((val) => ({
        ...val,
        variant: val.variant === '' ? null : val.variant, // Replace empty strings with null
      })),
    ),
    shippingAddress: shippingAddressSchema,
    totalAmount: z.number(),
    orderDate: z.string(),
  }),
});

export const OrderValidation = {
  orderSchema,
};
