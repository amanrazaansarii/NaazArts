import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { milestones: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check authorization: if order has userId, verify session
    if (order.userId && (!session || session.userId !== order.userId)) {
      return NextResponse.json({ error: 'Unauthorized to cancel this order' }, { status: 403 });
    }

    // If order is already DISPATCHED or DELIVERED, cannot cancel
    if (order.status === 'DISPATCHED' || order.status === 'DELIVERED') {
      return NextResponse.json(
        { error: 'Cannot cancel order once it has already been dispatched from studio.' },
        { status: 400 }
      );
    }

    // Update order status to CANCELLED
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
      },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully.',
      order: {
        id: updated.id,
        status: 'cancelled',
      },
    });
  } catch (error: any) {
    console.error('[API] Cancel order error:', error);
    return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
  }
}
