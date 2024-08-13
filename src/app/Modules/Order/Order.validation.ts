import { z } from 'zod';

// Define the Zod schema for IShippingAddress
const shippingAddressSchema = z.object({
  division: z.string(),
  district: z.string(),
  subDistrict: z.string(),
  address: z.string(),
  name: z.string(),
  phone: z.string(),
});

// Define the Zod schema for IOrder
const orderSchema = z.object({
  body: z.object({
    user: z.string(),
    products: z.array(
      z.object({
        product: z.string(),
        variant: z.string(),
        quantity: z.number(),
        price: z.number(),
      }),
    ),
    shippingAddress: shippingAddressSchema,
    totalAmount: z.number(),
    status: z
      .enum(['pending', 'processed', 'shipped', 'delivered', 'cancelled'])
      .default('pending'),
    orderDate: z.string(),
  }),
});

export const OrderValidation = {
  orderSchema,
};
