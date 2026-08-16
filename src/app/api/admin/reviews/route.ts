import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { reviewSchema } from '@/lib/validators';

export async function GET(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const source = searchParams.get('source');
    const q = searchParams.get('q')?.toLowerCase().trim();

    let reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (source && source !== 'ALL') {
      reviews = reviews.filter((r) => r.source.toLowerCase() === source.toLowerCase());
    }

    if (q) {
      reviews = reviews.filter(
        (r) =>
          r.customerName.toLowerCase().includes(q) ||
          r.reviewText.toLowerCase().includes(q) ||
          (r.productSlug && r.productSlug.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('[API] Admin get reviews error:', error);
    return NextResponse.json({ error: 'Failed to retrieve reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = reviewSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid review data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const data = validated.data;

    const newReview = await prisma.review.create({
      data: {
        customerName: data.customerName,
        customerAvatar: data.customerAvatar || null,
        source: data.source,
        sourceUrl: data.sourceUrl || null,
        rating: data.rating,
        reviewText: data.reviewText,
        productSlug: data.productSlug || null,
        reviewDate: data.reviewDate,
        isFeatured: data.isFeatured,
        isPublished: data.isPublished,
      },
    });

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    console.error('[API] Admin create review error:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
