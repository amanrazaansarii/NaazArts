import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getProductBySlug, getRelatedProducts, PRODUCTS, Product } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

async function getLiveProduct(slug: string): Promise<{ product: Product | null; related: Product[] }> {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (dbProduct) {
      let images: string[] = [];
      let prices: Record<string, number> = { USD: dbProduct.priceValue };
      let details: string[] = [];
      let colors: any[] = [];
      let variants: any[] = [];

      try {
        if (dbProduct.images) images = JSON.parse(dbProduct.images);
        else if (dbProduct.image) images = [dbProduct.image];
      } catch {}

      try {
        if (dbProduct.prices) prices = JSON.parse(dbProduct.prices);
      } catch {}

      try {
        if (dbProduct.details) details = JSON.parse(dbProduct.details);
      } catch {}

      try {
        if (dbProduct.colors) colors = JSON.parse(dbProduct.colors);
      } catch {}

      try {
        if (dbProduct.variants) variants = JSON.parse(dbProduct.variants);
      } catch {}

      const product: Product = {
        id: dbProduct.id,
        slug: dbProduct.slug,
        name: dbProduct.name,
        category: dbProduct.categoryName as any,
        collection: dbProduct.collection || undefined,
        productType: dbProduct.productType || undefined,
        price: dbProduct.price,
        priceValue: dbProduct.priceValue,
        swatch: dbProduct.swatch,
        badge: (dbProduct.badge as "new" | "limited") || undefined,
        image: dbProduct.image || (images.length > 0 ? images[0] : undefined),
        images,
        prices,
        description: dbProduct.description,
        details: details.length > 0 ? details : ["Handcrafted mineral concrete", "Protective beeswax sealant", "Felt base pads attached"],
        dimensions: dbProduct.dimensions,
        weight: dbProduct.weight,
        inStock: dbProduct.inStock,
        stockStatus: dbProduct.stockStatus,
        productionStatus: dbProduct.productionStatus,
        leadTime: dbProduct.leadTime,
        colors: colors.length > 0 ? colors : undefined,
        variants: variants.length > 0 ? variants : undefined,
      };

      const dbRelated = await prisma.product.findMany({
        where: { slug: { not: slug } },
        take: 4,
      });

      const related: Product[] = dbRelated.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        category: r.categoryName as any,
        price: r.price,
        priceValue: r.priceValue,
        swatch: r.swatch,
        badge: (r.badge as any) || undefined,
        image: r.image || undefined,
        description: r.description,
        details: [],
        dimensions: r.dimensions,
        weight: r.weight,
        inStock: r.inStock,
        leadTime: r.leadTime,
      }));

      return { product, related };
    }
  } catch (error) {
    console.error("[Product Detail] Error querying DB:", error);
  }

  const staticProduct = getProductBySlug(slug);
  const staticRelated = getRelatedProducts(slug, 4);
  return { product: staticProduct || null, related: staticRelated };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { product } = await getLiveProduct(slug);

  if (!product) {
    return {
      title: "Piece Not Found — Naaz Arts",
    };
  }

  return {
    title: `${product.name} — Handmade Concrete Art | Naaz Arts`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { product, related } = await getLiveProduct(slug);

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <span className="eyebrow">Studio Catalog</span>
        <h1 style={{ margin: "12px 0 16px" }}>Piece Not Found</h1>
        <p className="body-text" style={{ maxWidth: "460px", margin: "0 auto 28px" }}>
          This handcrafted concrete design may have been retired or renamed. Explore our current collections below.
        </p>
        <Link href="/shop" className="btn btn-clay">
          Return to All Pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="product-page-root">
      {/* Breadcrumb Navigation */}
      <nav className="container breadcrumbs-nav" aria-label="Breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/shop" className="breadcrumb-link">
          Shop
        </Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-link">{product.category}</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Interactive Client Component for Gallery, Quantity, Cart and Accordions */}
      <ProductDetailClient product={product} relatedProducts={related} />
    </div>
  );
}
