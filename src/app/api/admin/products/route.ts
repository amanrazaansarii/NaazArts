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
    const collection = searchParams.get('collection');
    const productType = searchParams.get('productType');
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
      };
    });

    if (category && category !== 'All') {
      products = products.filter((p) => p.categoryName.toLowerCase() === category.toLowerCase());
    }

    if (collection && collection !== 'All' && collection !== 'All Collections') {
      products = products.filter((p) => p.collection?.toLowerCase() === collection.toLowerCase());
    }

    if (productType && productType !== 'All' && productType !== 'All Types') {
      products = products.filter((p) => p.productType?.toLowerCase() === productType.toLowerCase());
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
          (p.collection && p.collection.toLowerCase().includes(q)) ||
          (p.productType && p.productType.toLowerCase().includes(q)) ||
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
    let baseSlug = (data.slug || data.name || `piece-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!baseSlug) baseSlug = `piece-${Date.now()}`;

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const id = data.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const categoryName = data.categoryName || 'Premium trays';

    // Ensure category exists
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const primaryImage = data.image || (data.images && data.images.length > 0 ? data.images[0] : null);
    const numPrice = Number(data.priceValue || 28);

    const newProduct = await prisma.product.create({
      data: {
        id,
        slug: uniqueSlug,
        name: data.name,
        categoryName,
        collection: data.collection || 'Premium jars & trays',
        productType: data.productType || categoryName || 'Premium Trays',
        price: data.price || `$${numPrice}`,
        priceValue: numPrice,
        swatch: data.swatch || 'var(--tone-1)',
        badge: data.badge || null,
        image: primaryImage,
        images: JSON.stringify(data.images || (primaryImage ? [primaryImage] : [])),
        prices: JSON.stringify(data.prices || { USD: numPrice, INR: Math.round(numPrice * 82), EUR: Math.round(numPrice * 0.92), GBP: Math.round(numPrice * 0.79) }),
        description: data.description || 'Handcrafted artisanal concrete piece from Naaz Arts Studio.',
        details: JSON.stringify(data.details && data.details.length > 0 ? data.details : ['Hand-cast mineral concrete', 'Natural protective beeswax sealant', 'Protective scratch-resistant base pads']),
        dimensions: data.dimensions || '8.25" L x 4.5" W',
        weight: data.weight || '420g',
        inStock: data.stockStatus !== 'OUT_OF_STOCK' && data.stockStatus !== 'UNAVAILABLE',
        stockStatus: data.stockStatus || 'IN_STOCK',
        productionStatus: data.productionStatus || 'READY',
        leadTime: data.leadTime || 'Dispatched in 2-3 studio days',
        colors: data.colors ? JSON.stringify(data.colors) : null,
        variants: data.variants ? JSON.stringify(data.variants) : null,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    console.error('[API] Admin create product error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product.' }, { status: 500 });
  }
}
