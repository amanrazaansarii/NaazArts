import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productSlug = searchParams.get('productSlug');
    const featuredOnly = searchParams.get('featured') === 'true';

    let whereClause: any = { isPublished: true };
    if (productSlug) {
      whereClause.productSlug = productSlug;
    }
    if (featuredOnly) {
      whereClause.isFeatured = true;
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('[API] Public get reviews error:', error);
    return NextResponse.json({ reviews: [] });
  }
}
