"use client";

import { useState } from "react";
import { PRODUCTS, CATEGORIES, Category } from "@/data/products";

export function ShopCatalog() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
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
        {activeCategory === "All" ? (
          <>
            Showing <strong>{filteredProducts.length}</strong> products
          </>
        ) : (
          <>
            Showing <strong>{filteredProducts.length}</strong> results in{" "}
            <strong>{activeCategory}</strong>
          </>
        )}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((p, idx) => (
            <div key={`${p.name}-${idx}`} className="product-card">
              <div className="product-thumb" style={{ background: p.swatch }}>
                {p.badge === "new" && (
                  <span className="badge badge-new">New</span>
                )}
                {p.badge === "limited" && (
                  <span className="badge badge-limited">Limited — festive</span>
                )}
              </div>
              <div className="product-name">{p.name}</div>
              <div className="product-cat">{p.category}</div>
              <div className="product-price">{p.price}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No products in this category yet — check back soon.
        </p>
      )}
    </>
  );
}
