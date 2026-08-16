import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        addresses: {
          where: { isDefault: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const defaultAddress = user.addresses[0]
      ? {
          fullName: user.addresses[0].fullName,
          street: user.addresses[0].street,
          city: user.addresses[0].city,
          state: user.addresses[0].state,
          zipCode: user.addresses[0].zipCode,
          country: user.addresses[0].country,
          phone: user.addresses[0].phone || '',
        }
      : undefined;

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        memberSince: user.memberSince,
        avatarText: user.avatarText,
        defaultAddress,
      },
    });
  } catch (error: any) {
    console.error('[API] Me check error:', error);
    return NextResponse.json({ user: null });
  }
}
