import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { promoCodeSchema } from '@/lib/validators';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const validated = promoCodeSchema.partial().safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid promo code data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const updated = await prisma.promoCode.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json({ success: true, promoCode: updated });
  } catch (error: any) {
    console.error('[API] Update promo error:', error);
    return NextResponse.json({ error: 'Failed to update promo code' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.promoCode.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Promo code deleted' });
  } catch (error: any) {
    console.error('[API] Delete promo error:', error);
    return NextResponse.json({ error: 'Failed to delete promo code' }, { status: 500 });
  }
}
