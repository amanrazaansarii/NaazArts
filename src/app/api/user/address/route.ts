import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { addressSchema } from '@/lib/validators';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const address = await prisma.address.findFirst({
      where: { userId: session.userId, isDefault: true },
    });

    return NextResponse.json({ address: address || null });
  } catch (error: any) {
    console.error('[API] Get address error:', error);
    return NextResponse.json({ error: 'Failed to retrieve address' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = addressSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid address details';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { fullName, street, city, state, zipCode, country, phone } = validated.data;

    // Check if user has an existing default address
    const existing = await prisma.address.findFirst({
      where: { userId: session.userId, isDefault: true },
    });

    let savedAddress;
    if (existing) {
      savedAddress = await prisma.address.update({
        where: { id: existing.id },
        data: {
          fullName,
          street,
          city,
          state,
          zipCode,
          country,
          phone: phone || null,
        },
      });
    } else {
      savedAddress = await prisma.address.create({
        data: {
          userId: session.userId,
          fullName,
          street,
          city,
          state,
          zipCode,
          country,
          phone: phone || null,
          isDefault: true,
        },
      });
    }

    return NextResponse.json({
      address: {
        fullName: savedAddress.fullName,
        street: savedAddress.street,
        city: savedAddress.city,
        state: savedAddress.state,
        zipCode: savedAddress.zipCode,
        country: savedAddress.country,
        phone: savedAddress.phone || '',
      },
    });
  } catch (error: any) {
    console.error('[API] Save address error:', error);
    return NextResponse.json({ error: 'Failed to save address' }, { status: 500 });
  }
}
