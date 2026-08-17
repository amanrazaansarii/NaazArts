"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  ImageIcon,
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
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
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant");
  const addItem = useCartStore((state) => state.addItem);

  // Determine initial variant
  const initialVariant = (() => {
    if (variantParam && product.variants && product.variants.length > 0) {
      const found = product.variants.find(
        (v) => v.name.toLowerCase() === variantParam.toLowerCase()
      );
      if (found) return found;
    }
    if (product.variants && product.variants.length > 0) {
      return product.variants[0];
    }
    return null;
  })();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(initialVariant);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    initialVariant ? initialVariant.name : product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );

  // Active display image
  const [activeImage, setActiveImage] = useState<string | undefined>(
    initialVariant?.image || product.image || (product.images && product.images.length > 0 ? product.images[0] : undefined)
  );

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("craft");
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync if URL query param changes
  useEffect(() => {
    if (variantParam && product.variants && product.variants.length > 0) {
      const match = product.variants.find(
        (v) => v.name.toLowerCase() === variantParam.toLowerCase()
      );
      if (match) {
        setSelectedVariant(match);
        setSelectedColor(match.name);
        if (match.image) setActiveImage(match.image);
      }
    }
  }, [variantParam, product.variants]);

  // Handle switching variant
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setSelectedColor(variant.name);
    if (variant.image) {
      setActiveImage(variant.image);
    }
  };

  // Compute active price & stock
  const currentPriceDisplay = selectedVariant?.priceOverride
    ? `$${selectedVariant.priceOverride}`
    : product.price;

  const currentPriceValue = selectedVariant?.priceOverride || product.priceValue;

  const isCurrentOutOfStock =
    selectedVariant?.stockStatus === "OUT_OF_STOCK" ||
    selectedVariant?.stockStatus === "UNAVAILABLE" ||
    product.stockStatus === "OUT_OF_STOCK" ||
    product.stockStatus === "UNAVAILABLE" ||
    !product.inStock;

  const handleAddToCart = () => {
    if (isCurrentOutOfStock) return;
    addItem(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isCurrentOutOfStock) return;
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

  // Compile all available thumbnails (main images + variant images)
  const allThumbnails = Array.from(
    new Set([
      ...(product.images || []),
      ...(product.image ? [product.image] : []),
      ...(product.variants?.map((v) => v.image).filter(Boolean) as string[] || []),
    ])
  );

  return (
    <div className="container product-detail-container">
      <div className="product-detail-layout">
        {/* Left Column: Product Gallery / Square Imagery */}
        <div className="product-gallery-pane">
          <div
            className="product-main-view organic-frame"
            style={{ background: selectedVariant?.colorHex || product.swatch }}
          >
            {activeImage ? (
              <img
                src={activeImage}
                alt={`${product.name} ${selectedVariant ? `— ${selectedVariant.name}` : ""}`}
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
            {isCurrentOutOfStock && (
              <span
                className="badge"
                style={{
                  background: "rgba(43,38,34,0.85)",
                  color: "#FFFFFF",
                  top: "16px",
                  right: "16px",
                  left: "auto",
                  padding: "6px 12px",
                }}
              >
                Out of Stock
              </span>
            )}
          </div>

          {/* Thumbnail Gallery Carousel */}
          {allThumbnails.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                padding: "4px 0 12px",
                marginTop: "12px",
              }}
            >
              {allThumbnails.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: activeImage === imgUrl ? "2px solid var(--clay)" : "1px solid rgba(43,38,34,0.12)",
                    padding: 0,
                    cursor: "pointer",
                    background: "#FFFFFF",
                    flexShrink: 0,
                    opacity: activeImage === imgUrl ? 1 : 0.7,
                    transition: "all 0.15s ease",
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}

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
            <h1 className="product-title" style={{ textTransform: "capitalize" }}>
              {product.name}
            </h1>
            <div className="product-price-tag" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{currentPriceDisplay}</span>
              {selectedVariant?.priceOverride && (
                <span style={{ fontSize: "0.85rem", color: "var(--ink-faint)", textDecoration: "line-through" }}>
                  {product.price}
                </span>
              )}
            </div>
          </div>

          <p className="product-description-text">{product.description}</p>

          {/* VARIANTS & DESIGN FINISHES SELECTION BLOCK */}
          {product.variants && product.variants.length > 0 ? (
            <div className="product-options-block">
              <div className="option-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span>Selected Variant Tone: </span>
                  <strong>{selectedVariant?.name || selectedColor}</strong>
                </div>
                {selectedVariant?.stockStatus === "OUT_OF_STOCK" && (
                  <span style={{ fontSize: "0.75rem", color: "#EF4444", fontWeight: 600 }}>
                    Currently Sold Out
                  </span>
                )}
              </div>

              <div className="color-swatch-list" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id || selectedColor === v.name;
                  const isVarOutOfStock = v.stockStatus === "OUT_OF_STOCK" || v.stockStatus === "UNAVAILABLE";

                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`color-swatch-pill ${isSelected ? "is-selected" : ""}`}
                      style={{
                        opacity: isVarOutOfStock ? 0.6 : 1,
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 14px",
                        borderRadius: "24px",
                        border: isSelected ? "2px solid var(--clay)" : "1px solid var(--line)",
                        background: isSelected ? "var(--clay-tint)" : "var(--card)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSelectVariant(v)}
                      aria-label={`Select ${v.name}`}
                    >
                      {/* Mini Thumbnail or Color Swatch */}
                      {v.image ? (
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.12)",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={v.image}
                            alt={v.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </span>
                      ) : (
                        <span
                          className="swatch-circle"
                          style={{ background: v.colorHex || "#A8B29A", width: "14px", height: "14px", borderRadius: "50%" }}
                        />
                      )}

                      <span style={{ fontWeight: isSelected ? 700 : 500, fontSize: "0.85rem" }}>
                        {v.name}
                      </span>

                      {v.priceOverride && (
                        <span style={{ fontSize: "0.75rem", color: "var(--clay-deep)", fontWeight: 700 }}>
                          (${v.priceOverride})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Fallback to basic colors if no rich variants */
            product.colors && product.colors.length > 0 && (
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
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.image) setActiveImage(c.image);
                      }}
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
            )
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
                  disabled={quantity <= 1 || isCurrentOutOfStock}
                >
                  <Minus size={15} />
                </button>
                <span className="counter-val">{quantity}</span>
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  disabled={isCurrentOutOfStock}
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
                disabled={isCurrentOutOfStock}
              >
                {isCurrentOutOfStock ? (
                  "Currently Out of Stock"
                ) : isAdded ? (
                  <>
                    <Check size={18} /> Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Bag —{" "}
                    {currentPriceValue > 0
                      ? `$${currentPriceValue * quantity}`
                      : currentPriceDisplay}
                  </>
                )}
              </button>

              {!isCurrentOutOfStock && (
                <button
                  type="button"
                  className="btn btn-sage product-buy-now-btn"
                  onClick={handleBuyNow}
                >
                  Buy Now →
                </button>
              )}
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
                <span>Concrete Craft &amp; Characteristics</span>
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
                <span>Dimensions &amp; Weight</span>
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
                        High-density white Portland cement &amp; natural mineral sand
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
                <span>Care &amp; Longevity</span>
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
                <span>Packaging &amp; Studio Delivery</span>
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
                    Packed plastic-free with shredded recycled paper, unbleached kraft boxes, and organic cotton ribbon. Free domestic shipping on orders over $60.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============ RELATED PRODUCTS ============ */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="related-products-section">
          <div className="section-title" style={{ textAlign: "left", marginBottom: "28px" }}>
            <span className="eyebrow">Complementary Pieces</span>
            <h2>You might also like</h2>
          </div>
          <div className="product-grid">
            {relatedProducts.map((rel) => (
              <div key={rel.slug} className="product-card-wrap">
                <Link href={`/shop/${rel.slug}`} className="product-card">
                  <div className="product-thumb" style={{ background: rel.swatch }}>
                    {rel.image && (
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="product-card-img"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="product-card-body">
                    <div className="product-name">{rel.name}</div>
                    <div className="product-cat">{rel.category}</div>
                    <div className="product-price">{rel.price}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
