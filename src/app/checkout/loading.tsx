import { SkeletonBox } from "@/components/Skeletons";

export default function CheckoutLoading() {
  return (
    <div className="checkout-page-root">
      <div className="container checkout-container">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
          <SkeletonBox style={{ width: "120px", height: "16px", borderRadius: "999px" }} />
          <SkeletonBox style={{ width: "140px", height: "16px", borderRadius: "999px" }} />
        </div>

        <div className="checkout-grid-layout">
          <div className="checkout-form-column" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="checkout-section-card" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }}>
              <SkeletonBox style={{ width: "160px", height: "24px", marginBottom: "16px", borderRadius: "6px" }} />
              <SkeletonBox style={{ height: "42px", borderRadius: "8px" }} />
            </div>
            <div className="checkout-section-card" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px" }}>
              <SkeletonBox style={{ width: "180px", height: "24px", marginBottom: "16px", borderRadius: "6px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <SkeletonBox style={{ height: "42px", borderRadius: "8px" }} />
                <SkeletonBox style={{ height: "42px", borderRadius: "8px" }} />
                <SkeletonBox style={{ height: "42px", gridColumn: "span 2", borderRadius: "8px" }} />
              </div>
            </div>
          </div>

          <div className="checkout-summary-sticky" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px" }}>
            <SkeletonBox style={{ width: "140px", height: "22px", marginBottom: "16px", borderRadius: "6px" }} />
            <SkeletonBox style={{ height: "60px", marginBottom: "12px", borderRadius: "8px" }} />
            <SkeletonBox style={{ height: "60px", marginBottom: "16px", borderRadius: "8px" }} />
            <SkeletonBox style={{ height: "48px", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
