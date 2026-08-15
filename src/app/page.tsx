import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Naaz Arts Workshops",
            "image": "https://naazarts.com/workshop.jpg",
            "description": "Learn to cast and paint your own concrete art in our offline workshops.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Your City",
              "addressCountry": "IN"
            }
          }),
        }}
      />
      {/* ============ HERO ============ */}
      <header className="hero">
        <picture className="hero-bg">
          <source
            media="(max-width: 767px)"
            srcSet="https://ik.imagekit.io/naazartstudio/ChatGPT%20Image%20Aug%2015,%202026,%2009_49_22%20PM.png"
          />
          <source
            media="(min-width: 768px)"
            srcSet="https://ik.imagekit.io/naazartstudio/ChatGPT%20Image%20Aug%2015,%202026,%2009_49_11%20PM.png"
          />
          <img
            src="https://ik.imagekit.io/naazartstudio/ChatGPT%20Image%20Aug%2015,%202026,%2009_49_11%20PM.png"
            alt="Naaz Arts - Functional handmade concrete art"
            className="hero-bg-img"
          />
        </picture>
        <div className="hero-overlay"></div>
        <div className="hero-inner">
          <p className="eyebrow">Handmade concrete art</p>
          <h1>Functional art for everyday spaces</h1>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Functional art for the home — and for the hands that want to make it.
          </p>
          <Link href="/shop" className="btn btn-clay">
            Shop the collection
          </Link>
        </div>
      </header>

      {/* ============ CATEGORY TILES ============ */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Explore</span>
            <h2>Every piece tells a small story</h2>
          </div>
          <div className="tile-grid">
            <Link href="/shop" className="tile">
              <div className="tile-icon">◐</div>
              <div className="tile-label">Premium trays</div>
            </Link>
            <Link href="/shop" className="tile">
              <div className="tile-icon">⌂</div>
              <div className="tile-label">Vases</div>
            </Link>
            <Link href="/shop" className="tile">
              <div className="tile-icon">✎</div>
              <div className="tile-label">Raw trays — DIY</div>
            </Link>
            <Link href="/workshops" className="tile">
              <div className="tile-icon">✦</div>
              <div className="tile-label">Workshops</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ STORY TEASER ============ */}
      <section className="section section-alt">
        <div className="container story-split">
          <img
            src="https://ik.imagekit.io/naazartstudio/IMG_9594.jpeg?updatedAt=1786810792307"
            alt="Naaz Arts story - Handmade candle and concrete vessel"
            className="organic-frame"
            width={340}
            height={340}
            loading="lazy"
          />
          <div>
            <span className="eyebrow">Our story</span>
            <h2 style={{ margin: "8px 0 12px" }}>
              From a wedding gift to a whole new craft
            </h2>
            <p className="body-text" style={{ marginBottom: "14px" }}>
              It started with a candle, made for a friend&apos;s wedding. Somewhere
              between finding the right jar and falling back in love with
              sculpture, this became something else entirely.
            </p>
            <Link
              href="/our-story"
              style={{ color: "var(--clay)", fontWeight: 600, fontSize: "0.85rem" }}
            >
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Shop</span>
            <h2>Best sellers</h2>
          </div>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-thumb" style={{ background: "var(--tone-1)" }}>
                <span className="badge badge-new">New</span>
              </div>
              <div className="product-name">Marble tray — sage</div>
              <div className="product-cat">Premium tray</div>
              <div className="product-price">$28</div>
            </div>
            <div className="product-card">
              <div className="product-thumb" style={{ background: "var(--tone-2)" }}></div>
              <div className="product-name">Earth-tone coaster set</div>
              <div className="product-cat">Coasters</div>
              <div className="product-price">$16</div>
            </div>
            <div className="product-card">
              <div className="product-thumb" style={{ background: "var(--tone-3)" }}></div>
              <div className="product-name">Pastel vase</div>
              <div className="product-cat">Vases</div>
              <div className="product-price">$34</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE PROCESS (Craftsmanship) ============ */}
      <section className="section section-alt">
        <div className="container story-split reverse">
          <img
            src="https://ik.imagekit.io/naazartstudio/IMG_9446.jpeg?updatedAt=1786811427259"
            alt="Naaz Arts craftsmanship and casting process"
            className="organic-frame"
            width={340}
            height={340}
            loading="lazy"
          />
          <div>
            <span className="eyebrow">The Process</span>
            <h2 style={{ margin: "8px 0 12px" }}>
              Cast by hand. Cured with patience.
            </h2>
            <p className="body-text" style={{ marginBottom: "14px" }}>
              Every piece of Naaz Arts is mixed, poured, and sanded by hand in small batches. We embrace the tiny air bubbles and raw textures — the unmistakable marks of master-level craftsmanship and human touch.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CARE & CRAFT ============ */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">Care & Details</span>
            <h2>Made for everyday use</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", textAlign: "center" }}>
            <div style={{ background: "var(--card)", padding: "32px 24px", borderRadius: "var(--radius-card)", border: "1px solid var(--line)" }}>
              <h3 style={{ marginBottom: "8px" }}>Water Resistant</h3>
              <p className="body-text" style={{ fontSize: "0.85rem" }}>Sealed with natural, eco-friendly beeswax to repel water and resist stains.</p>
            </div>
            <div style={{ background: "var(--card)", padding: "32px 24px", borderRadius: "var(--radius-card)", border: "1px solid var(--line)" }}>
              <h3 style={{ marginBottom: "8px" }}>Food Safe</h3>
              <p className="body-text" style={{ fontSize: "0.85rem" }}>Our premium trays are safe for dry foods, fruits, and daily kitchen use.</p>
            </div>
            <div style={{ background: "var(--card)", padding: "32px 24px", borderRadius: "var(--radius-card)", border: "1px solid var(--line)" }}>
              <h3 style={{ marginBottom: "8px" }}>Easy to Clean</h3>
              <p className="body-text" style={{ fontSize: "0.85rem" }}>Simply wipe with a damp cloth. Avoid harsh chemicals or dishwasher use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORKSHOP BANNER ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="workshop-banner">
            <div>
              <div className="wb-title">Come make something with your hands</div>
              <div className="wb-sub">Next workshop — trays and vase painting</div>
            </div>
            <Link href="/workshops" className="btn btn-sage">
              Book a seat
            </Link>
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM ============ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-title" style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.2rem" }}>Follow along</h2>
          </div>
          <div className="insta-strip">
            <div style={{ background: "var(--tone-1)" }}></div>
            <div style={{ background: "var(--tone-2)" }}></div>
            <div style={{ background: "var(--tone-3)" }}></div>
            <div style={{ background: "var(--tone-8)" }}></div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <span className="eyebrow">Loved by hands across the world</span>
          <h2 style={{ margin: "20px 0 32px", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "var(--ink-soft)" }}>
            "A heavy, beautiful addition to my coffee table. You can feel the care poured into every corner."
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--tone-4)" }}></div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Sarah M.</span>
            <span style={{ fontSize: "0.85rem", color: "var(--ink-faint)" }}>Verified Buyer</span>
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="section section-alt">
        <div className="container newsletter">
          <h2 style={{ fontSize: "1.2rem" }}>Get first look at new drops</h2>
          <p className="lede" style={{ margin: "8px auto 0" }}>
            New designs, festive pieces, and workshop dates — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
