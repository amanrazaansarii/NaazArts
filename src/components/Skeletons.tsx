export function SkeletonBox({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`skeleton-shimmer ${className}`} style={style} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card-wrap">
      <div className="product-card" style={{ cursor: "default" }}>
        <div className="product-thumb">
          <SkeletonBox style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
        </div>
        <div className="product-card-body" style={{ width: "100%", marginTop: "10px" }}>
          <SkeletonBox style={{ width: "75%", height: "18px", marginBottom: "8px", borderRadius: "4px" }} />
          <SkeletonBox style={{ width: "45%", height: "12px", marginBottom: "8px", borderRadius: "4px" }} />
          <SkeletonBox style={{ width: "30%", height: "16px", borderRadius: "4px" }} />
        </div>
      </div>
    </div>
  );
}

export function CatalogSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div style={{ width: "100%" }}>
      {/* Filter Row Skeleton */}
      <div className="filter-row" style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px", flexWrap: "wrap" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBox
            key={i}
            style={{
              width: i === 0 ? "50px" : i === 1 ? "140px" : i === 2 ? "120px" : "100px",
              height: "36px",
              borderRadius: "999px",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <SkeletonBox style={{ width: "160px", height: "14px", borderRadius: "999px" }} />
      </div>

      {/* Product Grid Skeleton */}
      <div className="product-grid">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="product-page-root">
      {/* Breadcrumb Skeleton */}
      <div className="container breadcrumbs-nav" style={{ display: "flex", gap: "8px", padding: "20px 20px 10px" }}>
        <SkeletonBox style={{ width: "40px", height: "12px", borderRadius: "999px" }} />
        <span style={{ color: "var(--line)" }}>/</span>
        <SkeletonBox style={{ width: "40px", height: "12px", borderRadius: "999px" }} />
        <span style={{ color: "var(--line)" }}>/</span>
        <SkeletonBox style={{ width: "80px", height: "12px", borderRadius: "999px" }} />
        <span style={{ color: "var(--line)" }}>/</span>
        <SkeletonBox style={{ width: "120px", height: "12px", borderRadius: "999px" }} />
      </div>

      {/* Main Detail Split Skeleton */}
      <div className="container product-detail-container">
        <div className="product-detail-layout">
          {/* Gallery View */}
          <div className="product-gallery-pane">
            <SkeletonBox className="product-main-view" style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: "14px" }} />
            <div className="product-trust-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "16px" }}>
              <SkeletonBox style={{ height: "60px", borderRadius: "8px" }} />
              <SkeletonBox style={{ height: "60px", borderRadius: "8px" }} />
              <SkeletonBox style={{ height: "60px", borderRadius: "8px" }} />
            </div>
          </div>

          {/* Info Column */}
          <div className="product-info-pane" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <SkeletonBox style={{ width: "100px", height: "14px", borderRadius: "999px" }} />
            <SkeletonBox style={{ width: "85%", height: "40px", borderRadius: "8px" }} />
            <SkeletonBox style={{ width: "110px", height: "30px", borderRadius: "8px" }} />
            <SkeletonBox style={{ width: "100%", height: "60px", borderRadius: "8px" }} />

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
              <SkeletonBox style={{ width: "120px", height: "14px", marginBottom: "10px", borderRadius: "999px" }} />
              <div style={{ display: "flex", gap: "8px" }}>
                <SkeletonBox style={{ width: "90px", height: "32px", borderRadius: "999px" }} />
                <SkeletonBox style={{ width: "100px", height: "32px", borderRadius: "999px" }} />
                <SkeletonBox style={{ width: "90px", height: "32px", borderRadius: "999px" }} />
              </div>
            </div>

            {/* Purchase Box */}
            <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <SkeletonBox style={{ width: "70px", height: "16px", borderRadius: "999px" }} />
                <SkeletonBox style={{ width: "100px", height: "34px", borderRadius: "8px" }} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <SkeletonBox style={{ flex: "1.4", height: "48px", borderRadius: "8px" }} />
                <SkeletonBox style={{ flex: "1", height: "48px", borderRadius: "8px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="cart-page-wrapper">
      <header className="page-header" style={{ textAlign: "center", padding: "36px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <SkeletonBox style={{ width: "70px", height: "12px", borderRadius: "999px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <SkeletonBox style={{ width: "220px", height: "36px", borderRadius: "8px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SkeletonBox style={{ width: "280px", height: "14px", borderRadius: "999px" }} />
        </div>
      </header>

      <div className="container cart-content-container">
        <div className="cart-grid-layout">
          {/* Items Column */}
          <div className="cart-items-column" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SkeletonBox style={{ height: "54px", borderRadius: "12px" }} />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "14px", display: "flex", gap: "16px", alignItems: "center" }}>
                <SkeletonBox style={{ width: "78px", height: "78px", borderRadius: "10px", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <SkeletonBox style={{ width: "60%", height: "18px", borderRadius: "4px" }} />
                  <SkeletonBox style={{ width: "35%", height: "14px", borderRadius: "4px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                    <SkeletonBox style={{ width: "80px", height: "28px", borderRadius: "6px" }} />
                    <SkeletonBox style={{ width: "50px", height: "18px", borderRadius: "4px" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Column */}
          <div className="cart-summary-card" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <SkeletonBox style={{ width: "130px", height: "22px", borderRadius: "6px" }} />
            <SkeletonBox style={{ height: "42px", borderRadius: "8px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <SkeletonBox style={{ height: "16px", borderRadius: "4px" }} />
              <SkeletonBox style={{ height: "16px", borderRadius: "4px" }} />
              <SkeletonBox style={{ height: "24px", borderRadius: "6px", marginTop: "8px" }} />
            </div>
            <SkeletonBox style={{ height: "48px", borderRadius: "8px", marginTop: "10px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GenericPageSkeleton({ title = "Loading page..." }: { title?: string }) {
  return (
    <div style={{ padding: "40px 0 80px" }}>
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <SkeletonBox style={{ width: "80px", height: "12px", borderRadius: "999px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <SkeletonBox style={{ width: "320px", height: "38px", borderRadius: "8px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SkeletonBox style={{ width: "420px", height: "16px", borderRadius: "999px" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SkeletonBox style={{ height: "180px", borderRadius: "14px" }} />
          <SkeletonBox style={{ height: "120px", borderRadius: "14px" }} />
          <SkeletonBox style={{ height: "90px", borderRadius: "14px" }} />
        </div>
      </div>
    </div>
  );
}
