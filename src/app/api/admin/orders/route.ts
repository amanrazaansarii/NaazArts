import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const q = searchParams.get('q')?.toLowerCase().trim();

    const dbOrders = await prisma.order.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    let orders = dbOrders.map((o) => {
      let items: any[] = [];
      let shippingAddress: any = {};

      try {
        if (o.items) items = JSON.parse(o.items);
      } catch {}

      try {
        if (o.shippingAddress) shippingAddress = JSON.parse(o.shippingAddress);
      } catch {}

      const customerName = shippingAddress.fullName || o.user?.name || 'Patron';
      const customerEmail = o.guestEmail || o.user?.email || 'studio@customer.com';

      return {
        id: o.id,
        customerName,
        customerEmail,
        customerPhone: shippingAddress.phone || '',
        status: o.status.toUpperCase(),
        subtotal: o.subtotal,
        discount: o.discount,
        shipping: o.shipping,
        total: o.total,
        promoCode: o.promoCode,
        carrier: o.carrier,
        estimatedDelivery: o.estimatedDelivery,
        shippingAddress,
        items,
        milestones: o.milestones.map((m) => ({
          id: m.id,
          title: m.title,
          description: m.description,
          timestamp: m.timestamp,
          completed: m.completed,
          sortOrder: m.sortOrder,
        })),
        createdAt: o.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        createdAtIso: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
      };
    });

    if (status && status !== 'ALL') {
      orders = orders.filter((o) => o.status === status.toUpperCase());
    }

    if (q) {
      orders = orders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          (o.shippingAddress.city && o.shippingAddress.city.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('[API] Admin get orders error:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}
