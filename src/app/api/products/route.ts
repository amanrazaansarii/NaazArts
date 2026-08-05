import { NextResponse } from 'next/server';
import { getDbProducts } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const b2b = searchParams.get('b2b') === 'true';

    const products = getDbProducts(category, search, b2b);

    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
