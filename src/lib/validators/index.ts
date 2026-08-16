import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  street: z.string().min(3, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State / Province is required'),
  zipCode: z.string().min(3, 'ZIP / Postal code is required'),
  country: z.string().default('United States'),
  phone: z.string().optional().nullable(),
});

export const cartItemSchema = z.object({
  id: z.string(),
  product: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    price: z.string(),
    priceValue: z.number(),
    swatch: z.string(),
    image: z.string().optional(),
    badge: z.string().optional(),
    description: z.string().optional(),
    dimensions: z.string().optional(),
    weight: z.string().optional(),
    inStock: z.boolean().optional(),
    leadTime: z.string().optional(),
  }),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
  selectedColor: z.string().optional(),
});

export const createOrderSchema = z.object({
  email: z.string().email('Valid email is required'),
  shippingAddress: addressSchema,
  shippingMethod: z.enum(['standard', 'express']).default('standard'),
  paymentType: z.enum(['card', 'upi', 'cod']).default('card'),
  promoCode: z.string().optional().nullable(),
  items: z.array(cartItemSchema).min(1, 'At least one item is required'),
});

export const validatePromoSchema = z.object({
  code: z.string().min(1, 'Promo code is required'),
  itemsCount: z.number().int().min(0).default(1),
  subtotal: z.number().min(0),
});
