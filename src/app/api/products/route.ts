import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS, Product } from '@/data/products';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q')?.toLowerCase().trim();

    // Query from Prisma
    let dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });

    let products: Product[];

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.categoryName as any,
        price: p.price,
        priceValue: p.priceValue,
        swatch: p.swatch,
        badge: (p.badge as 'new' | 'limited') || undefined,
        image: p.image || undefined,
        images: p.images ? JSON.parse(p.images) : p.image ? [p.image] : [],
        prices: p.prices ? JSON.parse(p.prices) : undefined,
        description: p.description,
        details: p.details ? JSON.parse(p.details) : [],
        dimensions: p.dimensions,
        weight: p.weight,
        inStock: p.inStock,
        stockStatus: p.stockStatus,
        productionStatus: p.productionStatus,
        leadTime: p.leadTime,
        colors: p.colors ? JSON.parse(p.colors) : undefined,
        variants: p.variants ? JSON.parse(p.variants) : undefined,
      }));
    } else {
      // Fallback
      products = PRODUCTS;
    }

    // Filter
    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('[API] Products query error:', error);
    return NextResponse.json({ products: PRODUCTS });
  }
}
