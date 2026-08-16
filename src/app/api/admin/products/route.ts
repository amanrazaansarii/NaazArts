import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { productSchema } from '@/lib/validators';

export async function GET(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const stockStatus = searchParams.get('stockStatus');
    const q = searchParams.get('q')?.toLowerCase().trim();

    let dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    let products = dbProducts.map((p) => {
      let images: string[] = [];
      let prices: Record<string, number> = { USD: p.priceValue, INR: Math.round(p.priceValue * 82), EUR: Math.round(p.priceValue * 0.92), GBP: Math.round(p.priceValue * 0.79) };
      let details: string[] = [];
      let colors: any[] = [];
      let variants: any[] = [];

      try {
        if (p.images) images = JSON.parse(p.images);
        else if (p.image) images = [p.image];
      } catch {}

      try {
        if (p.prices) prices = JSON.parse(p.prices);
      } catch {}

      try {
        if (p.details) details = JSON.parse(p.details);
      } catch {}

      try {
        if (p.colors) colors = JSON.parse(p.colors);
      } catch {}

      try {
        if (p.variants) variants = JSON.parse(p.variants);
      } catch {}

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        categoryName: p.categoryName,
        price: p.price,
        priceValue: p.priceValue,
        swatch: p.swatch,
        badge: p.badge,
        image: p.image || (images.length > 0 ? images[0] : null),
        images,
        prices,
        description: p.description,
        details,
        dimensions: p.dimensions,
        weight: p.weight,
        inStock: p.inStock,
        stockStatus: p.stockStatus || (p.inStock ? 'IN_STOCK' : 'OUT_OF_STOCK'),
        productionStatus: p.productionStatus || 'READY',
        leadTime: p.leadTime,
        colors,
        variants,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });

    if (category && category !== 'All') {
      products = products.filter((p) => p.categoryName.toLowerCase() === category.toLowerCase());
    }

    if (stockStatus && stockStatus !== 'ALL') {
      products = products.filter((p) => p.stockStatus === stockStatus);
    }

    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('[API] Admin get products error:', error);
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid product data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const data = validated.data;
    const slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const id = data.id || `prod-${Date.now()}`;

    // Ensure category exists
    await prisma.category.upsert({
      where: { name: data.categoryName },
      update: {},
      create: { name: data.categoryName },
    });

    const primaryImage = data.image || (data.images && data.images.length > 0 ? data.images[0] : null);

    const newProduct = await prisma.product.create({
      data: {
        id,
        slug,
        name: data.name,
        categoryName: data.categoryName,
        price: data.price || `$${data.priceValue}`,
        priceValue: data.priceValue,
        swatch: data.swatch || 'var(--tone-1)',
        badge: data.badge || null,
        image: primaryImage,
        images: data.images ? JSON.stringify(data.images) : JSON.stringify(primaryImage ? [primaryImage] : []),
        prices: data.prices ? JSON.stringify(data.prices) : JSON.stringify({ USD: data.priceValue, INR: Math.round(data.priceValue * 82) }),
        description: data.description,
        details: JSON.stringify(data.details || []),
        dimensions: data.dimensions,
        weight: data.weight,
        inStock: data.stockStatus !== 'OUT_OF_STOCK' && data.stockStatus !== 'UNAVAILABLE',
        stockStatus: data.stockStatus,
        productionStatus: data.productionStatus,
        leadTime: data.leadTime,
        colors: data.colors ? JSON.stringify(data.colors) : null,
        variants: data.variants ? JSON.stringify(data.variants) : null,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error('[API] Admin create product error:', error);
    return NextResponse.json({ error: 'Failed to create product. Slug may already exist.' }, { status: 500 });
  }
}
