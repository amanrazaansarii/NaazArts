import { SkeletonBox } from "@/components/Skeletons";

export default function TrackLoading() {
  return (
    <div className="track-page-wrapper" style={{ padding: "40px 0 80px" }}>
      <div className="container tracker-container">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <SkeletonBox style={{ width: "80px", height: "12px", borderRadius: "999px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <SkeletonBox style={{ width: "260px", height: "36px", borderRadius: "8px" }} />
          </div>
        </div>

        <div className="tracker-search-card" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px", marginBottom: "28px" }}>
          <SkeletonBox style={{ height: "48px", borderRadius: "10px" }} />
        </div>

        <div className="tracker-header-card" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "14px", padding: "24px", marginBottom: "24px", display: "flex", justifyContent: "space-between" }}>
          <SkeletonBox style={{ width: "200px", height: "32px", borderRadius: "6px" }} />
          <SkeletonBox style={{ width: "120px", height: "32px", borderRadius: "999px" }} />
        </div>

        <div className="tracker-columns-grid">
          <SkeletonBox style={{ height: "300px", borderRadius: "14px" }} />
          <SkeletonBox style={{ height: "300px", borderRadius: "14px" }} />
        </div>
      </div>
    </div>
  );
}
