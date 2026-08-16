import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { createOrderSchema } from '@/lib/validators';
import { sendOrderConfirmationEmail } from '@/lib/email';

async function generateUniqueTrackingId(): Promise<string> {
  let unique = false;
  let trackingId = '';
  while (!unique) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    trackingId = `#NAS-${randomDigits}`;
    const existing = await prisma.order.findUnique({
      where: { id: trackingId },
    });
    if (!existing) {
      unique = true;
    }
  }
  return trackingId;
}

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const dbOrders = await prisma.order.findMany({
      where: {
        OR: [
          { userId: session.userId },
          { guestEmail: session.email },
        ],
      },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const orders = dbOrders.map((o) => {
      let items = [];
      let shippingAddress = {};
      try {
        items = JSON.parse(o.items);
      } catch {}
      try {
        shippingAddress = JSON.parse(o.shippingAddress);
      } catch {}

      return {
        id: o.id,
        createdAt: o.createdAt.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        status: o.status.toLowerCase(),
        items,
        subtotal: o.subtotal,
        discount: o.discount,
        shipping: o.shipping,
        total: o.total,
        promoCode: o.promoCode || undefined,
        shippingAddress,
        estimatedDelivery: o.estimatedDelivery,
        carrier: o.carrier,
        trackingMilestones: o.milestones.map((m) => ({
          title: m.title,
          description: m.description,
          timestamp: m.timestamp,
          completed: m.completed,
        })),
      };
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('[API] Get user orders error:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createOrderSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid order details';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, shippingAddress, shippingMethod, promoCode, items } = validated.data;
    const session = await getSessionUser();

    // 1. Calculate pricing
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.priceValue || 0) * item.quantity,
      0
    );

    let discountPercent = 0;
    let cleanPromo: string | null = null;

    if (promoCode) {
      const codeUpper = promoCode.trim().toUpperCase();
      if (codeUpper === 'DECOR10') {
        const totalQty = items.reduce((acc, it) => acc + it.quantity, 0);
        if (totalQty >= 3) {
          discountPercent = 10;
          cleanPromo = 'DECOR10';
        }
      } else if (codeUpper === 'FIRST10') {
        if (session) {
          const pastOrders = await prisma.order.count({
            where: {
              userId: session.userId,
              status: { not: 'CANCELLED' },
            },
          });
          if (pastOrders === 0) {
            discountPercent = 10;
            cleanPromo = 'FIRST10';
          }
        }
      }
    }

    const discountAmount = discountPercent > 0 ? (subtotal * discountPercent) / 100 : 0;
    const baseShipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
    const finalShipping = shippingMethod === 'express' ? baseShipping + 12 : baseShipping;
    const grandTotal = Math.max(0, subtotal - discountAmount + finalShipping);

    // 2. Generate unique tracking ID
    const trackingId = await generateUniqueTrackingId();

    // 3. Estimated Delivery
    const today = new Date();
    const deliveryDays = shippingMethod === 'express' ? 3 : 6;
    const estDateObj = new Date(today);
    estDateObj.setDate(today.getDate() + deliveryDays);
    const estimatedDelivery = estDateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    // 4. Create Order with Milestones
    const order = await prisma.order.create({
      data: {
        id: trackingId,
        userId: session?.userId || null,
        guestEmail: email.toLowerCase().trim(),
        status: 'CONFIRMED',
        subtotal,
        discount: discountAmount,
        shipping: finalShipping,
        total: grandTotal,
        promoCode: cleanPromo,
        carrier: 'Artisan Courier Direct',
        estimatedDelivery,
        shippingAddress: JSON.stringify(shippingAddress),
        items: JSON.stringify(items),
        milestones: {
          create: [
            {
              title: 'Order Confirmed & Logged',
              description: 'Studio order registered and queued for hand-casting',
              timestamp: 'Just now',
              completed: true,
              sortOrder: 1,
            },
            {
              title: 'Hand-Casting & Curing',
              description: 'Mixing mineral pigments and 48-hour slow cure in silicone molds',
              timestamp: 'Scheduled for next studio cycle',
              completed: false,
              sortOrder: 2,
            },
            {
              title: 'Fine Sanding & Studio Packing',
              description: 'Hand-sanding raw edges and penetrating organic beeswax coat',
              timestamp: 'Scheduled',
              completed: false,
              sortOrder: 3,
            },
            {
              title: 'Dispatched from Studio',
              description: 'Carefully wrapped in plastic-free corrugated protection',
              timestamp: 'Pending completion',
              completed: false,
              sortOrder: 4,
            },
            {
              title: 'Delivered to Doorstep',
              description: 'Arrival at customer address',
              timestamp: 'Estimated in 5-7 days',
              completed: false,
              sortOrder: 5,
            },
          ],
        },
      },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    // 5. Trigger Resend Confirmation Email Asynchronously
    const trackingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://naazarts.com'}/track?id=${encodeURIComponent(trackingId)}`;
    sendOrderConfirmationEmail({
      toEmail: email,
      recipientName: shippingAddress.fullName,
      orderId: trackingId,
      total: grandTotal,
      items: items.map((it) => ({
        name: it.product.name,
        quantity: it.quantity,
        price: it.product.priceValue,
        color: it.selectedColor,
      })),
      shippingAddress,
      trackingUrl,
    }).catch((err) => {
      console.error('[API] Async email dispatch error:', err);
    });

    const responseOrder = {
      id: order.id,
      createdAt: order.createdAt.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      status: order.status.toLowerCase(),
      items,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      total: order.total,
      shippingAddress,
      estimatedDelivery: order.estimatedDelivery,
      carrier: order.carrier,
      trackingMilestones: order.milestones.map((m) => ({
        title: m.title,
        description: m.description,
        timestamp: m.timestamp,
        completed: m.completed,
      })),
    };

    return NextResponse.json({ order: responseOrder }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create studio order. Please try again.' },
      { status: 500 }
    );
  }
}
