import { SkeletonBox } from "@/components/Skeletons";

export default function ProfileLoading() {
  return (
    <div className="profile-page-wrapper" style={{ padding: "40px 0 80px" }}>
      <div className="container profile-container">
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "16px", padding: "24px", marginBottom: "28px", display: "flex", gap: "16px", alignItems: "center" }}>
          <SkeletonBox style={{ width: "56px", height: "56px", borderRadius: "999px" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <SkeletonBox style={{ width: "180px", height: "24px", borderRadius: "6px" }} />
            <SkeletonBox style={{ width: "240px", height: "14px", borderRadius: "999px" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <SkeletonBox style={{ height: "220px", borderRadius: "14px" }} />
          <SkeletonBox style={{ height: "220px", borderRadius: "14px" }} />
        </div>
      </div>
    </div>
  );
}
