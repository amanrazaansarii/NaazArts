import { PrismaClient, OrderStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS, CATEGORIES } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Naaz Arts database...');

  // 1. Seed Categories
  console.log('Seeding categories...');
  for (const catName of CATEGORIES) {
    if (catName === 'All') continue;
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName },
    });
  }

  // 2. Seed Products
  console.log('Seeding products...');
  for (const prod of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        id: prod.id,
        name: prod.name,
        categoryName: prod.category,
        price: prod.price,
        priceValue: prod.priceValue,
        swatch: prod.swatch,
        badge: prod.badge || null,
        image: prod.image || null,
        description: prod.description,
        details: JSON.stringify(prod.details),
        dimensions: prod.dimensions,
        weight: prod.weight,
        inStock: prod.inStock,
        leadTime: prod.leadTime,
        colors: prod.colors ? JSON.stringify(prod.colors) : null,
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        categoryName: prod.category,
        price: prod.price,
        priceValue: prod.priceValue,
        swatch: prod.swatch,
        badge: prod.badge || null,
        image: prod.image || null,
        description: prod.description,
        details: JSON.stringify(prod.details),
        dimensions: prod.dimensions,
        weight: prod.weight,
        inStock: prod.inStock,
        leadTime: prod.leadTime,
        colors: prod.colors ? JSON.stringify(prod.colors) : null,
      },
    });
  }

  // 3. Seed Promo Codes (DECOR10: 3+ items, FIRST10: authenticated first order)
  console.log('Seeding promo codes...');
  // Clean up any deprecated promo codes
  await prisma.promoCode.deleteMany({
    where: {
      code: {
        in: ['NAAZ10', 'STUDIO10', 'HANDMADE15'],
      },
    },
  });

  await prisma.promoCode.upsert({
    where: { code: 'DECOR10' },
    update: {
      discountPercent: 10,
      minItems: 3,
      firstOrderOnly: false,
      requiresAuth: false,
      isActive: true,
      description: '10% Studio discount for orders with 3 or more pieces',
    },
    create: {
      code: 'DECOR10',
      discountPercent: 10,
      minItems: 3,
      firstOrderOnly: false,
      requiresAuth: false,
      isActive: true,
      description: '10% Studio discount for orders with 3 or more pieces',
    },
  });

  await prisma.promoCode.upsert({
    where: { code: 'FIRST10' },
    update: {
      discountPercent: 10,
      minItems: 1,
      firstOrderOnly: true,
      requiresAuth: true,
      isActive: true,
      description: '10% Welcome Patron discount on your first studio order (Account required)',
    },
    create: {
      code: 'FIRST10',
      discountPercent: 10,
      minItems: 1,
      firstOrderOnly: true,
      requiresAuth: true,
      isActive: true,
      description: '10% Welcome Patron discount on your first studio order (Account required)',
    },
  });

  // 4. Seed Demo Patron User & Orders
  console.log('Seeding demo patron user...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('StudioPatron2026!', salt);

  const demoUser = await prisma.user.upsert({
    where: { email: 'patron@naazarts.com' },
    update: {
      name: 'Maya Lin',
      passwordHash,
      memberSince: 'August 2026',
      avatarText: 'ML',
    },
    create: {
      name: 'Maya Lin',
      email: 'patron@naazarts.com',
      passwordHash,
      memberSince: 'August 2026',
      avatarText: 'ML',
    },
  });

  // Default address
  const defaultAddress = {
    fullName: 'Maya Lin',
    street: '248 Hawthorne Blvd, Suite 2',
    city: 'Portland',
    state: 'OR',
    zipCode: '97214',
    country: 'United States',
    phone: '+1 (503) 914-2849',
  };

  await prisma.address.deleteMany({ where: { userId: demoUser.id } });
  await prisma.address.create({
    data: {
      userId: demoUser.id,
      ...defaultAddress,
      isDefault: true,
    },
  });

  // 5. Seed Demo Orders (#NAS-749102 and #NAS-382910)
  console.log('Seeding sample orders...');
  const order1Items = [
    {
      id: 'prod-1',
      product: PRODUCTS.find((p) => p.id === 'prod-1') || PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Sage Mist',
    },
    {
      id: 'prod-12',
      product: PRODUCTS.find((p) => p.id === 'prod-12') || PRODUCTS[11],
      quantity: 1,
    },
  ];

  await prisma.order.upsert({
    where: { id: '#NAS-749102' },
    update: {
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: OrderStatus.CASTING,
      subtotal: 44,
      discount: 4.4,
      shipping: 6,
      total: 45.6,
      promoCode: 'FIRST10',
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 20 - 22, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify(order1Items),
    },
    create: {
      id: '#NAS-749102',
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: OrderStatus.CASTING,
      subtotal: 44,
      discount: 4.4,
      shipping: 6,
      total: 45.6,
      promoCode: 'FIRST10',
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 20 - 22, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify(order1Items),
      milestones: {
        create: [
          {
            title: 'Order Confirmed & Logged',
            description: 'Studio order registered in batch #84',
            timestamp: 'Aug 14, 09:30 AM',
            completed: true,
            sortOrder: 1,
          },
          {
            title: 'Hand-Casting & Curing',
            description: 'Mineral pigment mixed and cast in silicone mold (48h cure cycle)',
            timestamp: 'Aug 15, 11:00 AM',
            completed: true,
            sortOrder: 2,
          },
          {
            title: 'Fine Sanding & Studio Packing',
            description: 'Edge-smoothing, 3-coat organic wax penetration, and packaging',
            timestamp: 'In Progress (Estimated Aug 17)',
            completed: false,
            sortOrder: 3,
          },
          {
            title: 'Dispatched from Studio',
            description: 'Wrapped in plastic-free recycled paper packaging',
            timestamp: 'Estimated Aug 18',
            completed: false,
            sortOrder: 4,
          },
          {
            title: 'Delivered to Doorstep',
            description: 'Safe arrival at destination',
            timestamp: 'Estimated Aug 21',
            completed: false,
            sortOrder: 5,
          },
        ],
      },
    },
  });

  const order2Items = [
    {
      id: 'prod-9',
      product: PRODUCTS.find((p) => p.id === 'prod-9') || PRODUCTS[8],
      quantity: 1,
    },
  ];

  await prisma.order.upsert({
    where: { id: '#NAS-382910' },
    update: {
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: OrderStatus.DELIVERED,
      subtotal: 34,
      discount: 0,
      shipping: 6,
      total: 40,
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 14, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify(order2Items),
    },
    create: {
      id: '#NAS-382910',
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: OrderStatus.DELIVERED,
      subtotal: 34,
      discount: 0,
      shipping: 6,
      total: 40,
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 14, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify(order2Items),
      milestones: {
        create: [
          {
            title: 'Order Confirmed & Logged',
            description: 'Studio order registered in batch #81',
            timestamp: 'Aug 10, 02:15 PM',
            completed: true,
            sortOrder: 1,
          },
          {
            title: 'Hand-Casting & Curing',
            description: 'Cast & slow cured',
            timestamp: 'Aug 11, 10:00 AM',
            completed: true,
            sortOrder: 2,
          },
          {
            title: 'Fine Sanding & Studio Packing',
            description: 'Sealed for water protection and carefully packed',
            timestamp: 'Aug 12, 04:00 PM',
            completed: true,
            sortOrder: 3,
          },
          {
            title: 'Dispatched from Studio',
            description: 'In transit with tracking #ACD-94821',
            timestamp: 'Aug 13, 08:30 AM',
            completed: true,
            sortOrder: 4,
          },
          {
            title: 'Delivered to Doorstep',
            description: 'Left at front porch, signed by recipient',
            timestamp: 'Aug 14, 01:20 PM',
            completed: true,
            sortOrder: 5,
          },
        ],
      },
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
