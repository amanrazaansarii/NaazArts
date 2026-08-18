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

// Admin Product Schema
export const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().min(1, 'Product name is required'),
  categoryName: z.string().default('Premium trays'),
  price: z.string().optional(),
  priceValue: z.number().default(28),
  swatch: z.string().default('var(--tone-1)'),
  badge: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  images: z.array(z.string()).optional(),
  prices: z.record(z.string(), z.number()).optional(), // { USD: 28, INR: 2299, EUR: 26, GBP: 22 }
  description: z.string().default(''),
  details: z.array(z.string()).default([]),
  dimensions: z.string().default('8.25" L x 4.5" W'),
  weight: z.string().default('420g'),
  inStock: z.boolean().default(true),
  stockStatus: z.enum(['IN_STOCK', 'OUT_OF_STOCK', 'UNAVAILABLE']).default('IN_STOCK'),
  productionStatus: z.enum(['READY', 'CASTING', 'CURING', 'RESTOCKING']).default('READY'),
  leadTime: z.string().default('Dispatched in 2-3 studio days'),
  collection: z.string().optional().nullable(),
  productType: z.string().optional().nullable(),
  colors: z.any().optional().nullable(),
  variants: z.any().optional().nullable(),
});

// Admin Order Status Update Schema
export const updateOrderStatusSchema = z.object({
  status: z.enum(['CONFIRMED', 'CASTING', 'PACKING', 'DISPATCHED', 'DELIVERED', 'CANCELLED']),
  carrier: z.string().optional(),
  trackingNumber: z.string().optional(),
  milestoneTitle: z.string().optional(),
  milestoneDescription: z.string().optional(),
  customNote: z.string().optional(),
});

// Admin Review Schema
export const reviewSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerAvatar: z.string().optional().nullable(),
  source: z.enum(['Instagram', 'WhatsApp', 'Google', 'Website', 'Studio Visitor', 'Pinterest']).default('Instagram'),
  sourceUrl: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  reviewText: z.string().min(3, 'Review text is required'),
  productSlug: z.string().optional().nullable(),
  reviewDate: z.string().default('Today'),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

// Contact & Inquiry Submission Schema
export const contactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().nullable(),
  type: z.string().default('General inquiry'),
  workshopSession: z.string().optional().nullable(),
  message: z.string().min(3, 'Message must be at least 3 characters'),
});

// Admin Inquiry Status Update Schema
export const updateInquirySchema = z.object({
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESPONDED', 'ARCHIVED']),
  adminNotes: z.string().optional().nullable(),
});

// Admin Workshop Schema
export const workshopSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  type: z.enum(['In-person', 'Online']).default('In-person'),
  date: z.string().min(2, 'Date is required'),
  location: z.string().min(2, 'Location is required'),
  price: z.string().min(1, 'Price is required'),
  priceValue: z.number().min(0),
  maxSeats: z.number().int().min(1).default(12),
  bookedSeats: z.number().int().min(0).default(0),
  description: z.string().min(5, 'Description is required'),
  isActive: z.boolean().default(true),
});

// Admin Promo Code Schema
export const promoCodeSchema = z.object({
  code: z.string().min(2, 'Code is required').toUpperCase(),
  discountPercent: z.number().min(1).max(100),
  minItems: z.number().int().min(1).default(1),
  firstOrderOnly: z.boolean().default(false),
  requiresAuth: z.boolean().default(false),
  isActive: z.boolean().default(true),
  description: z.string().min(3, 'Description is required'),
});
