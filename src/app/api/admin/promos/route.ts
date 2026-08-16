import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { promoCodeSchema } from '@/lib/validators';

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const promoCodes = await prisma.promoCode.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ promoCodes });
  } catch (error: any) {
    console.error('[API] Get promos error:', error);
    return NextResponse.json({ error: 'Failed to retrieve promo codes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = promoCodeSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid promo code data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const code = validated.data.code.toUpperCase().trim();
    const promo = await prisma.promoCode.create({
      data: {
        ...validated.data,
        code,
      },
    });

    return NextResponse.json({ success: true, promoCode: promo });
  } catch (error: any) {
    console.error('[API] Create promo error:', error);
    return NextResponse.json({ error: 'Failed to create promo. Code may already exist.' }, { status: 500 });
  }
}
