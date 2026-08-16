import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getProductBySlug, getRelatedProducts, Product } from '@/data/products';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const dbProduct = await prisma.product.findUnique({
      where: { slug },
    });

    let product: Product | null = null;
    if (dbProduct) {
      product = {
        id: dbProduct.id,
        slug: dbProduct.slug,
        name: dbProduct.name,
        category: dbProduct.categoryName as any,
        price: dbProduct.price,
        priceValue: dbProduct.priceValue,
        swatch: dbProduct.swatch,
        badge: (dbProduct.badge as 'new' | 'limited') || undefined,
        image: dbProduct.image || undefined,
        description: dbProduct.description,
        details: dbProduct.details ? JSON.parse(dbProduct.details) : [],
        dimensions: dbProduct.dimensions,
        weight: dbProduct.weight,
        inStock: dbProduct.inStock,
        leadTime: dbProduct.leadTime,
        colors: dbProduct.colors ? JSON.parse(dbProduct.colors) : undefined,
      };
    } else {
      product = getProductBySlug(slug) || null;
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const related = getRelatedProducts(slug, 4);

    return NextResponse.json({ product, relatedProducts: related });
  } catch (error: any) {
    console.error('[API] Product by slug error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
