"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, Check, X } from "lucide-react";
import { PRODUCTS, CATEGORIES, Category, Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export function ShopCatalog() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeQuery, setActiveQuery] = useState(queryParam);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setActiveQuery(queryParam);
  }, [queryParam]);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesQuery =
      !activeQuery ||
      p.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(activeQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(activeQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedSlug(product.slug);
    setTimeout(() => {
      setAddedSlug((curr) => (curr === product.slug ? null : curr));
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
              style={{ color: "inherit", cursor: "pointer" }}
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
            Showing <strong>{filteredProducts.length}</strong> products
          </>
        ) : (
          <>
            Showing <strong>{filteredProducts.length}</strong> results in{" "}
            <strong>{activeCategory}</strong>
            {activeQuery && ` for "${activeQuery}"`}
          </>
        )}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((p) => {
            const isJustAdded = addedSlug === p.slug;
            return (
              <div key={p.slug} className="product-card-wrap">
                <Link href={`/shop/${p.slug}`} className="product-card">
                  <div className="product-thumb" style={{ background: p.swatch }}>
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="product-card-img"
                        loading="lazy"
                      />
                    )}
                    {p.badge === "new" && (
                      <span className="badge badge-new">New</span>
                    )}
                    {p.badge === "limited" && (
                      <span className="badge badge-limited">Limited — festive</span>
                    )}

                    <button
                      type="button"
                      className={`product-quick-add-btn ${isJustAdded ? "is-added" : ""}`}
                      onClick={(e) => handleQuickAdd(e, p)}
                      aria-label={`Add ${p.name} to bag`}
                      title={`Add to Bag (${p.price})`}
                    >
                      {isJustAdded ? (
                        <Check size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </button>
                  </div>

                  <div className="product-card-body">
                    <div className="product-name">{p.name}</div>
                    <div className="product-cat">{p.category}</div>
                    <div className="product-price">{p.price}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">
          No products matched your selection. Try clearing filters or searching for another piece.
        </p>
      )}
    </>
  );
}
