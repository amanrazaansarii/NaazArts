import { CatalogSkeleton, SkeletonBox } from "@/components/Skeletons";

export default function ShopLoading() {
  return (
    <>
      <header className="page-header" style={{ textAlign: "center", padding: "40px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <SkeletonBox style={{ width: "60px", height: "12px", borderRadius: "999px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <SkeletonBox style={{ width: "240px", height: "36px", borderRadius: "8px" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SkeletonBox style={{ width: "300px", height: "16px", borderRadius: "999px" }} />
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CatalogSkeleton count={6} />
        </div>
      </section>
    </>
  );
}
