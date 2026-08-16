import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { validatePromoSchema } from '@/lib/validators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = validatePromoSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid promo request';
      return NextResponse.json({ valid: false, message: msg }, { status: 400 });
    }

    const { code, itemsCount } = validated.data;
    const cleanCode = code.trim().toUpperCase();

    // Check if code exists and is active in DB
    const promo = await prisma.promoCode.findUnique({
      where: { code: cleanCode },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid or expired coupon code.',
      });
    }

    // Specific rules for DECOR10
    if (cleanCode === 'DECOR10') {
      if (itemsCount < 3) {
        return NextResponse.json({
          valid: false,
          message: 'DECOR10 requires 3 or more handcrafted pieces in your bag.',
        });
      }
      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountPercent: promo.discountPercent,
        message: '10% Studio volume discount applied (3+ items)!',
      });
    }

    // Specific rules for FIRST10
    if (cleanCode === 'FIRST10') {
      const session = await getSessionUser();
      if (!session) {
        return NextResponse.json({
          valid: false,
          message: 'FIRST10 is exclusively for registered Studio Patrons. Please sign in or create an account to claim this offer.',
        });
      }

      // Check if user has already placed an order
      const existingOrderCount = await prisma.order.count({
        where: {
          userId: session.userId,
          status: { not: 'CANCELLED' },
        },
      });

      if (existingOrderCount > 0) {
        return NextResponse.json({
          valid: false,
          message: 'FIRST10 is only valid on your first studio order.',
        });
      }

      return NextResponse.json({
        valid: true,
        code: cleanCode,
        discountPercent: promo.discountPercent,
        message: '10% Welcome Patron discount applied to your first order!',
      });
    }

    // Fallback for general promo code in DB
    if (promo.minItems && itemsCount < promo.minItems) {
      return NextResponse.json({
        valid: false,
        message: `This coupon requires at least ${promo.minItems} items in your bag.`,
      });
    }

    return NextResponse.json({
      valid: true,
      code: cleanCode,
      discountPercent: promo.discountPercent,
      message: `${promo.discountPercent}% discount applied!`,
    });
  } catch (error: any) {
    console.error('[API] Promo validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Unable to validate promo code. Please try again.' },
      { status: 500 }
    );
  }
}
