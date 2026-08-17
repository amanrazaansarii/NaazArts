import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { productSchema } from '@/lib/validators';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    const p = await prisma.product.findUnique({
      where: { id },
    });

    if (!p) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let images: string[] = [];
    let prices: Record<string, number> = { USD: p.priceValue, INR: Math.round(p.priceValue * 82) };
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

    return NextResponse.json({
      product: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        categoryName: p.categoryName,
        collection: p.collection || null,
        productType: p.productType || null,
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
      },
    });
  } catch (error: any) {
    console.error('[API] Admin get product by ID error:', error);
    return NextResponse.json({ error: 'Failed to retrieve product' }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid product data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const data = validated.data;

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Ensure category exists
    await prisma.category.upsert({
      where: { name: data.categoryName },
      update: {},
      create: { name: data.categoryName },
    });

    const primaryImage = data.image || (data.images && data.images.length > 0 ? data.images[0] : existing.image);

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        categoryName: data.categoryName,
        collection: data.collection || null,
        productType: data.productType || null,
        price: data.price || `$${data.priceValue}`,
        priceValue: data.priceValue,
        swatch: data.swatch,
        badge: data.badge || null,
        image: primaryImage,
        images: data.images ? JSON.stringify(data.images) : existing.images,
        prices: data.prices ? JSON.stringify(data.prices) : existing.prices,
        description: data.description,
        details: JSON.stringify(data.details || []),
        dimensions: data.dimensions,
        weight: data.weight,
        inStock: data.stockStatus !== 'OUT_OF_STOCK' && data.stockStatus !== 'UNAVAILABLE',
        stockStatus: data.stockStatus,
        productionStatus: data.productionStatus,
        leadTime: data.leadTime,
        colors: data.colors ? JSON.stringify(data.colors) : existing.colors,
        variants: data.variants ? JSON.stringify(data.variants) : existing.variants,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error('[API] Admin update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('[API] Admin delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
