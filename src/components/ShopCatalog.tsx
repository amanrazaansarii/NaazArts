"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Check, X } from "lucide-react";
import { PRODUCTS, CATEGORIES, Category, Product, ProductVariant } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

interface CatalogItem {
  id: string;
  uniqueKey: string;
  slug: string;
  href: string;
  name: string;
  category: Category;
  collection?: string;
  productType?: string;
  price: string;
  priceValue: number;
  swatch: string;
  colorHex?: string;
  badge?: "new" | "limited";
  image?: string;
  variantName?: string;
  parentProduct: Product;
  stockStatus?: string;
}

export function ShopCatalog() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [addedKey, setAddedKey] = useState<string | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  // Fetch updated catalog from API if available
  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.products && Array.isArray(data.products)) {
          setProductsList(data.products);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setActiveQuery(queryParam);
  }, [queryParam]);

  // Flatten products with separate variants into individual catalog cards
  const catalogItems = useMemo(() => {
    const items: CatalogItem[] = [];

    productsList.forEach((prod) => {
      if (prod.variants && prod.variants.length > 0) {
        prod.variants.forEach((v: ProductVariant) => {
          // Format distinct title for variant piece
          const baseName = prod.name.split(" — ")[0].trim();
          const variantTitle = `${baseName} — ${v.name.toLowerCase()}`;
          const variantPrice = v.priceOverride ? `$${v.priceOverride}` : prod.price;
          const variantPriceVal = v.priceOverride || prod.priceValue;
          const variantImg = v.image || (v.images && v.images.length > 0 ? v.images[0] : prod.image);

          items.push({
            id: `${prod.id}-${v.id}`,
            uniqueKey: `${prod.slug}-${v.name}`,
            slug: prod.slug,
            href: `/shop/${prod.slug}?variant=${encodeURIComponent(v.name)}`,
            name: variantTitle,
            category: prod.category,
            collection: prod.collection,
            productType: prod.productType,
            price: variantPrice,
            priceValue: variantPriceVal,
            swatch: v.colorHex || prod.swatch,
            colorHex: v.colorHex,
            badge: prod.badge,
            image: variantImg,
            variantName: v.name,
            parentProduct: prod,
            stockStatus: v.stockStatus || prod.stockStatus,
          });
        });
      } else {
        // Standalone piece without variants
        items.push({
          id: prod.id,
          uniqueKey: prod.slug,
          slug: prod.slug,
          href: `/shop/${prod.slug}`,
          name: prod.name,
          category: prod.category,
          collection: prod.collection,
          productType: prod.productType,
          price: prod.price,
          priceValue: prod.priceValue,
          swatch: prod.swatch,
          badge: prod.badge,
          image: prod.image,
          parentProduct: prod,
          stockStatus: prod.stockStatus,
        });
      }
    });

    return items;
  }, [productsList]);

  // Filter based on active category & search query
  const filteredItems = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory ||
        item.productType?.toLowerCase() === activeCategory.toLowerCase();
      const q = activeQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.collection && item.collection.toLowerCase().includes(q)) ||
        (item.productType && item.productType.toLowerCase().includes(q)) ||
        item.parentProduct.description.toLowerCase().includes(q) ||
        (item.variantName && item.variantName.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [catalogItems, activeCategory, activeQuery]);

  const handleQuickAdd = (e: React.MouseEvent, item: CatalogItem) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item.parentProduct, 1, item.variantName);
    setAddedKey(item.uniqueKey);
    setTimeout(() => {
      setAddedKey((curr) => (curr === item.uniqueKey ? null : curr));
    }, 1500);
  };

  return (
    <>
      {activeQuery && (
        <div className="search-active-pill-bar" style={{ textAlign: "center", marginBottom: "16px" }}>
          <span
            className="filter-pill active"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <span>Search: &ldquo;{activeQuery}&rdquo;</span>
            <button
              type="button"
              onClick={() => setActiveQuery("")}
              style={{ color: "inherit", cursor: "pointer", background: "none", border: "none" }}
              aria-label="Clear search filter"
            >
              <X size={14} />
            </button>
          </span>
        </div>
      )}

      <div className="filter-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="results-count">
        {activeCategory === "All" && !activeQuery ? (
          <>
            Showing <strong>{filteredItems.length}</strong> handcrafted pieces &amp; variants
          </>
        ) : (
          <>
            Showing <strong>{filteredItems.length}</strong> pieces in{" "}
            <strong>{activeCategory}</strong>
            {activeQuery && ` for "${activeQuery}"`}
          </>
        )}
      </p>

      {filteredItems.length > 0 ? (
        <div className="product-grid">
          {filteredItems.map((item) => {
            const isJustAdded = addedKey === item.uniqueKey;
            const isOutOfStock = item.stockStatus === "OUT_OF_STOCK" || item.stockStatus === "UNAVAILABLE";

            return (
              <div key={item.uniqueKey} className="product-card-wrap">
                <Link href={item.href} className="product-card">
                  <div className="product-thumb" style={{ background: item.swatch }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-card-img"
                        loading="lazy"
                      />
                    )}
                    {item.badge === "new" && (
                      <span className="badge badge-new">New</span>
                    )}
                    {item.badge === "limited" && (
                      <span className="badge badge-limited">Limited — festive</span>
                    )}
                    {isOutOfStock && (
                      <span className="badge" style={{ background: "rgba(43,38,34,0.75)", color: "#FFFFFF", top: "12px", right: "12px", left: "auto" }}>
                        Out of stock
                      </span>
                    )}

                    {!isOutOfStock && (
                      <button
                        type="button"
                        className={`product-quick-add-btn ${isJustAdded ? "is-added" : ""}`}
                        onClick={(e) => handleQuickAdd(e, item)}
                        aria-label={`Add ${item.name} to bag`}
                        title={`Add to Bag (${item.price})`}
                      >
                        {isJustAdded ? (
                          <Check size={16} strokeWidth={2.5} />
                        ) : (
                          <Plus size={16} strokeWidth={2.5} />
                        )}
                      </button>
                    )}
                  </div>

                  <div className="product-card-body">
                    <div className="product-name" style={{ textTransform: "capitalize" }}>{item.name}</div>
                    <div className="product-cat" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{item.category}</span>
                      {item.colorHex && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: item.colorHex,
                            border: "1px solid rgba(0,0,0,0.12)",
                          }}
                        />
                      )}
                    </div>
                    <div className="product-price">{item.price}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">
          No pieces matched your selection. Try clearing filters or searching for another tone.
        </p>
      )}
    </>
  );
}
