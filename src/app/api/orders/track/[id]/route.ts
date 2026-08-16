import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rawId = decodeURIComponent(id).trim().toUpperCase();

    // Normalize to #NAS-XXXXXX
    let normalized = rawId.startsWith('#') ? rawId : `#${rawId}`;
    if (!normalized.startsWith('#NAS-')) {
      const digits = normalized.replace(/\D/g, '');
      normalized = `#NAS-${digits}`;
    }

    const order = await prisma.order.findUnique({
      where: { id: normalized },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (order) {
      let items = [];
      let shippingAddress = {};
      try {
        items = JSON.parse(order.items);
      } catch {}
      try {
        shippingAddress = JSON.parse(order.shippingAddress);
      } catch {}

      return NextResponse.json({
        order: {
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
        },
      });
    }

    // Check if format is valid #NAS-XXXXXX
    const nasRegex = /^#NAS-\d{6}$/i;
    if (nasRegex.test(normalized)) {
      // Synthetic fallback for unrecorded sample IDs
      const digits = normalized.slice(5);
      const isCasting = parseInt(digits[0], 10) % 2 === 0;

      return NextResponse.json({
        order: {
          id: normalized,
          createdAt: 'August 15, 2026',
          status: isCasting ? 'casting' : 'packing',
          items: [
            {
              id: 'synthetic-1',
              product: {
                id: 'prod-1',
                slug: 'marble-tray-sage',
                name: 'Marble tray — sage',
                category: 'Premium trays',
                price: '$28',
                priceValue: 28,
                swatch: 'var(--tone-1)',
                image: 'https://ik.imagekit.io/naazartstudio/IMG_6856.jpeg?updatedAt=1786806284780',
                description: 'Custom ordered piece currently in progress.',
                details: ['Hand-cast batch'],
                dimensions: '8.25" x 4.5"',
                weight: '420g',
                inStock: true,
                leadTime: '2-3 days',
              },
              quantity: 1,
              selectedColor: 'Sage Mist',
            },
          ],
          subtotal: 28,
          discount: 0,
          shipping: 0,
          total: 28,
          shippingAddress: {
            fullName: 'Valued Studio Patron',
            street: 'Destination Address On File',
            city: 'Metropolitan Area',
            state: 'State',
            zipCode: 'Postal Code',
            country: 'United States',
            phone: '+1 ••••••••••',
          },
          estimatedDelivery: 'August 21 - 23, 2026',
          carrier: 'Artisan Courier Direct',
          trackingMilestones: [
            {
              title: 'Order Confirmed & Logged',
              description: 'Studio order registered in batch queue',
              timestamp: 'Aug 15, 08:00 AM',
              completed: true,
            },
            {
              title: 'Hand-Casting & Curing',
              description: 'Mineral pigment poured in silicone mold (48h cure cycle)',
              timestamp: 'Aug 15, 01:30 PM',
              completed: true,
            },
            {
              title: 'Fine Sanding & Studio Packing',
              description: 'Edge finishing, organic beeswax seal, and studio packaging',
              timestamp: isCasting ? 'In Progress' : 'Aug 16, 11:00 AM',
              completed: !isCasting,
            },
            {
              title: 'Dispatched from Studio',
              description: 'Packed in plastic-free protective corrugated box',
              timestamp: isCasting ? 'Estimated Aug 18' : 'Aug 16, 04:00 PM',
              completed: false,
            },
            {
              title: 'Delivered to Doorstep',
              description: 'Arrival at destination',
              timestamp: 'Estimated in 3-5 days',
              completed: false,
            },
          ],
        },
      });
    }

    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  } catch (error: any) {
    console.error('[API] Tracking lookup error:', error);
    return NextResponse.json({ error: 'Failed to look up tracking ID' }, { status: 500 });
  }
}
