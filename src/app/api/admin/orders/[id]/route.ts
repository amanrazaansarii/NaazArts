import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { updateOrderStatusSchema } from '@/lib/validators';

const STATUS_STAGE_MAP: Record<string, number> = {
  CONFIRMED: 1,
  CASTING: 2,
  PACKING: 3,
  DISPATCHED: 4,
  DELIVERED: 5,
  CANCELLED: 0,
};

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    let { id } = await context.params;
    // Decode if encoded (e.g. %23NAS-...)
    id = decodeURIComponent(id);

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        milestones: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    let items = [];
    let shippingAddress = {};
    try {
      if (order.items) items = JSON.parse(order.items);
    } catch {}
    try {
      if (order.shippingAddress) shippingAddress = JSON.parse(order.shippingAddress);
    } catch {}

    return NextResponse.json({
      order: {
        ...order,
        items,
        shippingAddress,
      },
    });
  } catch (error: any) {
    console.error('[API] Admin get order by ID error:', error);
    return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    let { id } = await context.params;
    id = decodeURIComponent(id);

    const body = await req.json();
    const validated = updateOrderStatusSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid status data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { status, carrier, trackingNumber, milestoneDescription, customNote } = validated.data;

    // Check order
    const order = await prisma.order.findUnique({
      where: { id },
      include: { milestones: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const currentStageNum = STATUS_STAGE_MAP[status] || 1;
    const nowFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Update milestones completion based on stage
    if (order.milestones && order.milestones.length > 0) {
      for (const m of order.milestones) {
        let isCompleted = m.sortOrder <= currentStageNum;
        if (status === 'CANCELLED') {
          isCompleted = false;
        }

        let updatedTimestamp = m.timestamp;
        if (m.sortOrder === currentStageNum) {
          updatedTimestamp = nowFormatted;
        }

        let updatedDesc = m.description;
        if (m.sortOrder === currentStageNum && milestoneDescription) {
          updatedDesc = milestoneDescription;
        }

        await prisma.orderMilestone.update({
          where: { id: m.id },
          data: {
            completed: isCompleted,
            timestamp: updatedTimestamp,
            description: updatedDesc,
          },
        });
      }
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: status as any,
        carrier: carrier || order.carrier,
      },
      include: {
        milestones: { orderBy: { sortOrder: 'asc' } },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error('[API] Admin update order status error:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
