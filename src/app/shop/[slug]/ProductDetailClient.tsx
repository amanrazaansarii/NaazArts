"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  Plus,
  Minus,
  Heart,
  Share2,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0
      ? product.colors[0].name
      : undefined
  );
  const [activeAccordion, setActiveAccordion] = useState<string | null>("craft");
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container product-detail-container">
      <div className="product-detail-layout">
        {/* Left Column: Product Gallery / Square Imagery */}
        <div className="product-gallery-pane">
          <div
            className="product-main-view organic-frame"
            style={{ background: product.swatch }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="product-gallery-img"
              />
            ) : (
              <div className="product-gallery-fallback">
                <span>{product.name}</span>
              </div>
            )}

            {product.badge === "new" && (
              <span className="badge badge-new product-detail-badge">
                New Studio Drop
              </span>
            )}
            {product.badge === "limited" && (
              <span className="badge badge-limited product-detail-badge">
                Limited Edition Batch
              </span>
            )}
          </div>

          {/* Quick Feature Badges */}
          <div className="product-trust-strip">
            <div className="trust-item">
              <Sparkles size={16} className="trust-icon" />
              <span>100% Hand-Cast Concrete</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span>Natural Beeswax Finish</span>
            </div>
            <div className="trust-item">
              <Truck size={16} className="trust-icon" />
              <span>Plastic-Free Packaging</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Purchasing & Accordions */}
        <div className="product-info-pane">
          <div className="product-header-block">
            <span className="eyebrow">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price-tag">{product.price}</div>
          </div>

          <p className="product-description-text">{product.description}</p>

          {/* Color / Swatch Selection (if product has colors) */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-options-block">
              <div className="option-label">
                <span>Mineral Tone:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="color-swatch-list">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`color-swatch-pill ${
                      selectedColor === c.name ? "is-selected" : ""
                    }`}
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={`Select ${c.name}`}
                  >
                    <span
                      className="swatch-circle"
                      style={{ background: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="product-purchase-box">
            <div className="quantity-control-group">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={15} />
                </button>
                <span className="counter-val">{quantity}</span>
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="cta-button-group">
              <button
                type="button"
                className={`btn btn-clay product-add-btn ${
                  isAdded ? "is-success" : ""
                }`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check size={18} /> Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Bag —{" "}
                    {product.priceValue > 0
                      ? `$${product.priceValue * quantity}`
                      : product.price}
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-sage product-buy-now-btn"
                onClick={handleBuyNow}
              >
                Buy Now →
              </button>
            </div>

            <div className="product-sub-actions">
              <button
                type="button"
                className="sub-action-btn"
                onClick={handleShare}
              >
                <Share2 size={15} />
                <span>{copiedLink ? "Link Copied!" : "Share Piece"}</span>
              </button>
              <div className="lead-time-pill">
                <span className="lead-time-dot" />
                <span>{product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Accordion Specification Tabs */}
          <div className="product-accordions-group">
            {/* Accordion 1: Craftsmanship & Details */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => toggleAccordion("craft")}
                aria-expanded={activeAccordion === "craft"}
              >
                <span>Concrete Craft & Characteristics</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "craft" ? "is-open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "craft" && (
                <div className="accordion-body">
                  <ul className="accordion-checklist">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>
                        <span className="check-bullet">◈</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Dimensions & Weight */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => toggleAccordion("dimensions")}
                aria-expanded={activeAccordion === "dimensions"}
              >
                <span>Dimensions & Weight</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "dimensions" ? "is-open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "dimensions" && (
                <div className="accordion-body">
                  <div className="specs-grid">
                    <div className="spec-row">
                      <span className="spec-key">Dimensions:</span>
                      <span className="spec-val">{product.dimensions}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Weight:</span>
                      <span className="spec-val">{product.weight}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">Base Material:</span>
                      <span className="spec-val">
                        High-density white Portland cement & natural mineral sand
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Care & Maintenance */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => toggleAccordion("care")}
                aria-expanded={activeAccordion === "care"}
              >
                <span>Care & Longevity</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "care" ? "is-open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "care" && (
                <div className="accordion-body">
                  <p className="body-text" style={{ fontSize: "0.88rem" }}>
                    Each piece is treated with natural organic beeswax to resist
                    moisture and minor stains.
                  </p>
                  <ul
                    className="accordion-checklist"
                    style={{ marginTop: "10px" }}
                  >
                    <li>
                      <span className="check-bullet">◈</span>
                      <span>Wipe clean with a soft, warm damp cloth.</span>
                    </li>
                    <li>
                      <span className="check-bullet">◈</span>
                      <span>
                        Not suitable for dishwasher, microwave, or oven use.
                      </span>
                    </li>
                    <li>
                      <span className="check-bullet">◈</span>
                      <span>
                        Avoid harsh chemical cleaners or abrasive scouring pads.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 4: Shipping & Returns */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-trigger"
                onClick={() => toggleAccordion("shipping")}
                aria-expanded={activeAccordion === "shipping"}
              >
                <span>Studio Shipping & Guarantee</span>
                <ChevronDown
                  size={18}
                  className={`accordion-chevron ${
                    activeAccordion === "shipping" ? "is-open" : ""
                  }`}
                />
              </button>
              {activeAccordion === "shipping" && (
                <div className="accordion-body">
                  <p className="body-text" style={{ fontSize: "0.88rem" }}>
                    {product.leadTime}. All parcels are securely wrapped in
                    corrugated eco-cushioning. Orders over $60 qualify for free
                    domestic shipping. If your piece arrives damaged during
                    transit, we offer an immediate replacement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Related Pieces */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-title" style={{ textAlign: "left" }}>
            <span className="eyebrow">Studio Curations</span>
            <h2>Pairs well with</h2>
          </div>

          <div className="product-grid">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/shop/${rel.slug}`}
                className="product-card"
              >
                <div className="product-thumb" style={{ background: rel.swatch }}>
                  {rel.image && (
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="product-card-img"
                      loading="lazy"
                    />
                  )}
                  {rel.badge === "new" && (
                    <span className="badge badge-new">New</span>
                  )}
                </div>
                <div className="product-name">{rel.name}</div>
                <div className="product-cat">{rel.category}</div>
                <div className="product-price">{rel.price}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
