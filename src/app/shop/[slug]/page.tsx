import Link from "next/link";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
  const product = getProductBySlug(slug);

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

  const related = getRelatedProducts(slug, 4);

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
