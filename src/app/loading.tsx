import { SkeletonBox, ProductCardSkeleton } from "@/components/Skeletons";

export default function RootLoading() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Skeleton */}
      <section
        style={{
          minHeight: "calc(100dvh - 64px)",
          background: "var(--bone-deep)",
          padding: "80px 48px",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="container" style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
          <SkeletonBox style={{ width: "160px", height: "14px", borderRadius: "999px" }} />
          <SkeletonBox style={{ width: "min(560px, 90%)", height: "54px", borderRadius: "10px" }} />
          <SkeletonBox style={{ width: "min(460px, 75%)", height: "24px", borderRadius: "8px", marginBottom: "16px" }} />
          <SkeletonBox style={{ width: "180px", height: "46px", borderRadius: "8px" }} />
        </div>
      </section>

      {/* Section Skeleton */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
              <SkeletonBox style={{ width: "70px", height: "12px", borderRadius: "999px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SkeletonBox style={{ width: "280px", height: "32px", borderRadius: "8px" }} />
            </div>
          </div>

          <div className="product-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
