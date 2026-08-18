import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCTS, Product } from '@/data/products';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const collection = searchParams.get('collection');
    const productType = searchParams.get('productType');
    const q = searchParams.get('q')?.toLowerCase().trim();

    // Query from Prisma
    let dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    let products: Product[] = dbProducts.map((p) => {
      let images: string[] = [];
      let details: string[] = [];
      let colors: any[] = [];
      let variants: any[] = [];
      let prices: Record<string, number> | undefined = undefined;

      try { if (p.images) images = JSON.parse(p.images); else if (p.image) images = [p.image]; } catch {}
      try { if (p.prices) prices = JSON.parse(p.prices); } catch {}
      try { if (p.details) details = JSON.parse(p.details); } catch {}
      try { if (p.colors) colors = JSON.parse(p.colors); } catch {}
      try { if (p.variants) variants = JSON.parse(p.variants); } catch {}

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.categoryName as any,
        collection: p.collection || undefined,
        productType: p.productType || undefined,
        price: p.price,
        priceValue: p.priceValue,
        swatch: p.swatch,
        badge: (p.badge as 'new' | 'limited') || undefined,
        image: p.image || (images.length > 0 ? images[0] : undefined),
        images,
        prices,
        description: p.description,
        details,
        dimensions: p.dimensions,
        weight: p.weight,
        inStock: p.inStock,
        stockStatus: p.stockStatus,
        productionStatus: p.productionStatus,
        leadTime: p.leadTime,
        colors: colors.length > 0 ? colors : undefined,
        variants: variants.length > 0 ? variants : undefined,
      };
    });

    // Filter
    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (collection && collection !== 'All' && collection !== 'All Collections') {
      products = products.filter((p) => p.collection?.toLowerCase() === collection.toLowerCase());
    }

    if (productType && productType !== 'All' && productType !== 'All Types') {
      products = products.filter((p) => p.productType?.toLowerCase() === productType.toLowerCase());
    }

    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.collection && p.collection.toLowerCase().includes(q)) ||
          (p.productType && p.productType.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('[API] Products query error:', error);
    return NextResponse.json({ products: PRODUCTS });
  }
}
