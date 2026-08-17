import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCTS, CATEGORIES } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Naaz Arts comprehensive database...');

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

  // 2. Seed Products with Multi-images, Multi-currency, and Variants
  console.log('Seeding products...');
  for (const prod of PRODUCTS) {
    // Generate sample multi-image gallery
    const imagesGallery = [
      prod.image || 'https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780',
      'https://ik.imagekit.io/naazartstudio/IMG_8148.png?updatedAt=1786806300638',
      'https://ik.imagekit.io/naazartstudio/IMG_0294.jpeg?updatedAt=1786823662902',
    ];

    // Multi-currency price mapping
    const prices = {
      USD: prod.priceValue,
      INR: Math.round(prod.priceValue * 82),
      EUR: Math.round(prod.priceValue * 0.92),
      GBP: Math.round(prod.priceValue * 0.79),
    };

    // Rich variants
    const variants = prod.variants && prod.variants.length > 0
      ? prod.variants
      : prod.colors
      ? prod.colors.map((c, idx) => ({
          id: `var-${prod.id}-${idx + 1}`,
          name: c.name,
          colorHex: c.hex,
          swatchVar: c.swatchVar,
          stockStatus: 'IN_STOCK',
          priceOverride: null,
          image: c.image || imagesGallery[idx % imagesGallery.length],
        }))
      : [
          {
            id: `var-${prod.id}-1`,
            name: 'Standard Artisan Finish',
            colorHex: '#C1704E',
            swatchVar: 'var(--clay)',
            stockStatus: 'IN_STOCK',
            priceOverride: null,
            image: prod.image,
          },
        ];

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
        images: JSON.stringify(imagesGallery),
        prices: JSON.stringify(prices),
        variants: JSON.stringify(variants),
        description: prod.description,
        details: JSON.stringify(prod.details),
        dimensions: prod.dimensions,
        weight: prod.weight,
        inStock: prod.inStock,
        stockStatus: prod.inStock ? 'IN_STOCK' : 'OUT_OF_STOCK',
        productionStatus: 'READY',
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
        images: JSON.stringify(imagesGallery),
        prices: JSON.stringify(prices),
        variants: JSON.stringify(variants),
        description: prod.description,
        details: JSON.stringify(prod.details),
        dimensions: prod.dimensions,
        weight: prod.weight,
        inStock: prod.inStock,
        stockStatus: prod.inStock ? 'IN_STOCK' : 'OUT_OF_STOCK',
        productionStatus: 'READY',
        leadTime: prod.leadTime,
        colors: prod.colors ? JSON.stringify(prod.colors) : null,
      },
    });
  }

  // 3. Seed Promo Codes
  console.log('Seeding promo codes...');
  await prisma.promoCode.deleteMany({});
  await prisma.promoCode.createMany({
    data: [
      {
        code: 'DECOR10',
        discountPercent: 10,
        minItems: 3,
        firstOrderOnly: false,
        requiresAuth: false,
        isActive: true,
        description: '10% Studio discount for orders with 3 or more pieces',
      },
      {
        code: 'FIRST10',
        discountPercent: 10,
        minItems: 1,
        firstOrderOnly: true,
        requiresAuth: true,
        isActive: true,
        description: '10% Welcome Patron discount on your first studio order',
      },
      {
        code: 'ARTISAN15',
        discountPercent: 15,
        minItems: 2,
        firstOrderOnly: false,
        requiresAuth: false,
        isActive: true,
        description: '15% Seasonal Collector discount for twin pairings',
      },
    ],
  });

  // 4. Seed Admin & Patron Users
  console.log('Seeding users...');
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('StudioMaster2026!', salt);
  const patronPasswordHash = await bcrypt.hash('StudioPatron2026!', salt);

  const adminUser = await prisma.user.upsert({
    where: { email: 'creativenaaz.business@gmail.com' },
    update: {
      name: 'Naaz Studio Director',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      avatarText: 'NA',
    },
    create: {
      name: 'Naaz Studio Director',
      email: 'creativenaaz.business@gmail.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      memberSince: 'January 2026',
      avatarText: 'NA',
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: 'patron@naazarts.com' },
    update: {
      name: 'Maya Lin',
      passwordHash: patronPasswordHash,
      role: 'USER',
      avatarText: 'ML',
    },
    create: {
      name: 'Maya Lin',
      email: 'patron@naazarts.com',
      passwordHash: patronPasswordHash,
      role: 'USER',
      memberSince: 'August 2026',
      avatarText: 'ML',
    },
  });

  // Address
  await prisma.address.deleteMany({ where: { userId: demoUser.id } });
  const defaultAddress = {
    fullName: 'Maya Lin',
    street: '248 Hawthorne Blvd, Suite 2',
    city: 'Portland',
    state: 'OR',
    zipCode: '97214',
    country: 'United States',
    phone: '+1 (503) 914-2849',
  };
  await prisma.address.create({
    data: {
      userId: demoUser.id,
      ...defaultAddress,
      isDefault: true,
    },
  });

  // 5. Seed Diverse Orders for Tracking and Analytics
  console.log('Seeding orders...');
  await prisma.orderMilestone.deleteMany({});
  await prisma.order.deleteMany({});

  const sampleOrders = [
    {
      id: '#NAS-749102',
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: 'CASTING',
      subtotal: 44,
      discount: 4.4,
      shipping: 6,
      total: 45.6,
      promoCode: 'FIRST10',
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 20 - 22, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify([
        {
          id: 'prod-1',
          product: PRODUCTS[0],
          quantity: 1,
          selectedColor: 'Sage Mist',
        },
        {
          id: 'prod-12',
          product: PRODUCTS[11] || PRODUCTS[0],
          quantity: 1,
        },
      ]),
      createdAt: new Date('2026-08-14T10:30:00Z'),
      milestones: [
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
    {
      id: '#NAS-882319',
      guestEmail: 'avery.thorne@gmail.com',
      status: 'PACKING',
      subtotal: 82,
      discount: 8.2,
      shipping: 0,
      total: 73.8,
      promoCode: 'DECOR10',
      carrier: 'BlueDart Air Express',
      estimatedDelivery: 'August 18, 2026',
      shippingAddress: JSON.stringify({
        fullName: 'Avery Thorne',
        street: '712 Pine Street',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'United States',
        phone: '+1 (206) 555-0192',
      }),
      items: JSON.stringify([
        {
          id: 'prod-2',
          product: PRODUCTS[1] || PRODUCTS[0],
          quantity: 2,
          selectedColor: 'Terracotta Clay',
        },
        {
          id: 'prod-3',
          product: PRODUCTS[2] || PRODUCTS[0],
          quantity: 1,
        },
      ]),
      createdAt: new Date('2026-08-15T14:15:00Z'),
      milestones: [
        {
          title: 'Order Confirmed & Logged',
          description: 'Studio order registered in batch #85',
          timestamp: 'Aug 15, 02:15 PM',
          completed: true,
          sortOrder: 1,
        },
        {
          title: 'Hand-Casting & Curing',
          description: 'Mineral concrete cured successfully',
          timestamp: 'Aug 16, 09:00 AM',
          completed: true,
          sortOrder: 2,
        },
        {
          title: 'Fine Sanding & Studio Packing',
          description: 'Applying natural protective sealant',
          timestamp: 'Aug 16, 01:30 PM',
          completed: true,
          sortOrder: 3,
        },
        {
          title: 'Dispatched from Studio',
          description: 'Awaiting courier pickup',
          timestamp: 'Estimated Aug 17',
          completed: false,
          sortOrder: 4,
        },
        {
          title: 'Delivered to Doorstep',
          description: 'Direct courier delivery',
          timestamp: 'Estimated Aug 18',
          completed: false,
          sortOrder: 5,
        },
      ],
    },
    {
      id: '#NAS-554190',
      guestEmail: 'clara.dupont@paris.fr',
      status: 'DISPATCHED',
      subtotal: 56,
      discount: 0,
      shipping: 12,
      total: 68,
      carrier: 'DHL International Express',
      estimatedDelivery: 'August 19, 2026',
      shippingAddress: JSON.stringify({
        fullName: 'Clara Dupont',
        street: '14 Rue de Rivoli',
        city: 'Paris',
        state: 'IDF',
        zipCode: '75001',
        country: 'France',
        phone: '+33 6 12 34 56 78',
      }),
      items: JSON.stringify([
        {
          id: 'prod-1',
          product: PRODUCTS[0],
          quantity: 2,
          selectedColor: 'Blush Sand',
        },
      ]),
      createdAt: new Date('2026-08-12T08:00:00Z'),
      milestones: [
        {
          title: 'Order Confirmed & Logged',
          description: 'Order registered',
          timestamp: 'Aug 12, 08:00 AM',
          completed: true,
          sortOrder: 1,
        },
        {
          title: 'Hand-Casting & Curing',
          description: 'Casting completed',
          timestamp: 'Aug 13, 10:00 AM',
          completed: true,
          sortOrder: 2,
        },
        {
          title: 'Fine Sanding & Studio Packing',
          description: 'Packed in reinforced eco-box',
          timestamp: 'Aug 14, 03:00 PM',
          completed: true,
          sortOrder: 3,
        },
        {
          title: 'Dispatched from Studio',
          description: 'Departed Mumbai Hub — Tracking #DHL-88492019',
          timestamp: 'Aug 15, 07:45 AM',
          completed: true,
          sortOrder: 4,
        },
        {
          title: 'Delivered to Doorstep',
          description: 'In international transit',
          timestamp: 'Estimated Aug 19',
          completed: false,
          sortOrder: 5,
        },
      ],
    },
    {
      id: '#NAS-382910',
      userId: demoUser.id,
      guestEmail: demoUser.email,
      status: 'DELIVERED',
      subtotal: 34,
      discount: 0,
      shipping: 6,
      total: 40,
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 14, 2026',
      shippingAddress: JSON.stringify(defaultAddress),
      items: JSON.stringify([
        {
          id: 'prod-9',
          product: PRODUCTS[8] || PRODUCTS[0],
          quantity: 1,
        },
      ]),
      createdAt: new Date('2026-08-10T14:20:00Z'),
      milestones: [
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
    {
      id: '#NAS-219401',
      guestEmail: 'elena.rostova@designstudio.co',
      status: 'CONFIRMED',
      subtotal: 120,
      discount: 18,
      shipping: 0,
      total: 102,
      promoCode: 'ARTISAN15',
      carrier: 'Artisan Courier Direct',
      estimatedDelivery: 'August 24, 2026',
      shippingAddress: JSON.stringify({
        fullName: 'Elena Rostova',
        street: '450 Mission St, Fl 8',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'United States',
        phone: '+1 (415) 890-2134',
      }),
      items: JSON.stringify([
        {
          id: 'prod-1',
          product: PRODUCTS[0],
          quantity: 3,
          selectedColor: 'Sage Mist',
        },
        {
          id: 'prod-2',
          product: PRODUCTS[1] || PRODUCTS[0],
          quantity: 2,
          selectedColor: 'Terracotta Clay',
        },
      ]),
      createdAt: new Date('2026-08-16T08:15:00Z'),
      milestones: [
        {
          title: 'Order Confirmed & Logged',
          description: 'Batch scheduled for casting tomorrow morning',
          timestamp: 'Aug 16, 08:15 AM',
          completed: true,
          sortOrder: 1,
        },
        {
          title: 'Hand-Casting & Curing',
          description: 'Queued for mixing and mold pouring',
          timestamp: 'Queued (Aug 17)',
          completed: false,
          sortOrder: 2,
        },
        {
          title: 'Fine Sanding & Studio Packing',
          description: 'Scheduled for Aug 19',
          timestamp: 'Pending',
          completed: false,
          sortOrder: 3,
        },
        {
          title: 'Dispatched from Studio',
          description: 'Scheduled for Aug 20',
          timestamp: 'Pending',
          completed: false,
          sortOrder: 4,
        },
        {
          title: 'Delivered to Doorstep',
          description: 'Estimated Aug 24',
          timestamp: 'Pending',
          completed: false,
          sortOrder: 5,
        },
      ],
    },
  ];

  for (const orderData of sampleOrders) {
    const { milestones, ...orderFields } = orderData;
    const createdOrder = await prisma.order.create({
      data: orderFields,
    });
    for (const m of milestones) {
      await prisma.orderMilestone.create({
        data: {
          orderId: createdOrder.id,
          title: m.title,
          description: m.description,
          timestamp: m.timestamp,
          completed: m.completed,
          sortOrder: m.sortOrder,
        },
      });
    }
  }

  // 6. Seed Social Media Customer Reviews
  console.log('Seeding reviews...');
  await prisma.review.deleteMany({});
  await prisma.review.createMany({
    data: [
      {
        customerName: 'Kavya Sharma',
        customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        source: 'Instagram',
        sourceUrl: 'https://instagram.com/p/DF931298a',
        rating: 5,
        reviewText: 'The sage marble tray is breathtaking in person. The tactile organic texture and beeswax finish feel so luxurious on my dresser.',
        productSlug: 'marble-tray-sage',
        reviewDate: 'August 11, 2026',
        isFeatured: true,
        isPublished: true,
      },
      {
        customerName: 'Rohan Mehra',
        customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        source: 'WhatsApp',
        sourceUrl: '',
        rating: 5,
        reviewText: 'Ordered 8 custom candle trays for our boutique hotel suites in Goa. The craftsmanship, packaging, and zero damage on arrival was impressive!',
        productSlug: 'marble-tray-terracotta',
        reviewDate: 'August 13, 2026',
        isFeatured: true,
        isPublished: true,
      },
      {
        customerName: 'Ananya Deshmukh',
        customerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        source: 'Google',
        sourceUrl: '',
        rating: 5,
        reviewText: 'Attended the offline workshop last weekend. Loved getting my hands dirty with cement casting and pigment marbling. Will definitely come back!',
        productSlug: null,
        reviewDate: 'August 08, 2026',
        isFeatured: true,
        isPublished: true,
      },
      {
        customerName: 'Sophie Van Der Bilt',
        customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        source: 'Instagram',
        sourceUrl: 'https://instagram.com/p/DF88231',
        rating: 5,
        reviewText: 'The coaster set arrived safely in Amsterdam in perfect condition. Stunning minimalist aesthetic!',
        productSlug: 'earth-tone-coaster-set',
        reviewDate: 'August 14, 2026',
        isFeatured: false,
        isPublished: true,
      },
    ],
  });

  // 7. Seed Contact & Workshop Inquiries
  console.log('Seeding customer inquiries...');
  await prisma.contactSubmission.deleteMany({});
  await prisma.contactSubmission.createMany({
    data: [
      {
        name: 'Pooja Hegde',
        email: 'pooja.hegde@archdesign.in',
        phone: '+91 98201 49102',
        type: 'Wholesale / bulk jars',
        workshopSession: null,
        message: 'Hello Naaz Arts team, we are renovating an art cafe in Bandra and would love to procure 40 fluted concrete candle vessels and 25 oval trays.',
        status: 'NEW',
        adminNotes: 'High priority commercial client. Follow up with wholesale tier pricing sheet.',
      },
      {
        name: 'Devika Singhania',
        email: 'devika.s@gmail.com',
        phone: '+91 99104 88210',
        type: 'Workshop Registration',
        workshopSession: 'Offline Workshop — Tray & Vase Painting (Aug 29)',
        message: 'Would love to register 2 seats for myself and my sister for the in-person studio session.',
        status: 'IN_PROGRESS',
        adminNotes: 'Payment link sent via WhatsApp. Awaiting confirmation receipt.',
      },
      {
        name: 'Liam Gallagher',
        email: 'liam.g@oasisinteriors.uk',
        phone: '+44 7700 900123',
        type: 'Custom order',
        workshopSession: null,
        message: 'Looking for custom tinted black charcoal concrete console trays with gold leaf accents.',
        status: 'RESPONDED',
        adminNotes: 'Sample prototype photos shared via email.',
      },
      {
        name: 'Tanvi Joshi',
        email: 'tanvi.joshi99@outlook.com',
        phone: '+91 97654 32109',
        type: 'General inquiry',
        workshopSession: null,
        message: 'Can the concrete trays be used outdoors in rainy season without pigment fading?',
        status: 'NEW',
        adminNotes: null,
      },
    ],
  });

  // 8. Seed Scheduled Workshops
  console.log('Seeding workshops...');
  await prisma.workshop.deleteMany({});
  await prisma.workshop.createMany({
    data: [
      {
        title: 'Offline Workshop — Tray & Vase Hand-Casting & Painting',
        type: 'In-person',
        date: 'Saturday, August 29, 2026 (11:00 AM – 03:00 PM)',
        location: 'Naaz Arts Studio, 4th Floor Artisan Loft, Bandra West, Mumbai',
        price: '₹2,499 per seat (All materials & refreshments included)',
        priceValue: 2499,
        maxSeats: 12,
        bookedSeats: 8,
        description: 'Hands-on intensive masterclass. Learn silicone mold prep, mineral pigment marbling, bubble release techniques, water-curing, and organic beeswax sealing.',
        isActive: true,
      },
      {
        title: 'Online Masterclass — Concrete Decor from Home via Google Meet',
        type: 'Online',
        date: 'Sunday, September 06, 2026 (04:00 PM – 06:30 PM IST)',
        location: 'Live interactive video on Google Meet (Materials Kit shipped to doorstep)',
        price: '₹1,899 per kit',
        priceValue: 1899,
        maxSeats: 20,
        bookedSeats: 14,
        description: 'Join from anywhere in India. A curated kit with custom fast-setting stone cement, earth pigments, silicone mold, sanding pads, and sealant ships 4 days prior.',
        isActive: true,
      },
    ],
  });

  console.log('All Naaz Arts Studio data seeded successfully! 🌿✨');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
