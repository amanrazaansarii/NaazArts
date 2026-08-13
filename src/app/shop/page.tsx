import Link from "next/link";
import { ShopCatalog } from "@/components/ShopCatalog";

export const metadata = {
  title: "Shop — Naaz Arts",
  description:
    "Shop handmade concrete trays, vases, coasters, seasonal candles, starter kits, and wholesale candle jars.",
};

export default function ShopPage() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Shop</span>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginTop: "6px" }}>
          Shop the collection
        </h1>
        <p className="lede" style={{ margin: "10px auto 0" }}>
          Every piece hand-cast, hand-sealed, one of a kind.
        </p>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ShopCatalog />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="workshop-banner">
            <div>
              <div className="wb-title">Not sure which to pick?</div>
              <div className="wb-sub">
                DM us on Instagram or reach out for custom orders and bulk pricing.
              </div>
            </div>
            <Link href="/contact" className="btn btn-sage">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
