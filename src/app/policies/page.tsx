import Link from "next/link";

export const metadata = {
  title: "Shipping, Returns & Cancellation Policy — Naaz Art Studio",
  description:
    "Every piece at Naaz Art Studio is handmade to order. Learn about our processing times, damage replacement procedure, mandatory unboxing video requirement, and 6-hour cancellation window.",
};

export default function PoliciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does Naaz Art Studio take to dispatch an order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard Minimalist Collection orders are dispatched within 3–5 business days. Luxury Hand-Painted Collection orders require 5–7 business days due to meticulous fine-art painting, curing, and glazing.",
                },
              },
              {
                "@type": "Question",
                name: "Does Naaz Art Studio accept returns or exchanges?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We follow a strict No-Return and No-Exchange policy. However, if your order arrives damaged, we offer a free replacement of the same design or a full refund for unrepeatable Tier 1 custom pieces, subject to a mandatory unboxing video requirement.",
                },
              },
              {
                "@type": "Question",
                name: "How do I qualify for a damage replacement from Naaz Art Studio?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You must provide a continuous, unedited unboxing video showing the courier label and the full unboxing process from the first cut of outer tape to the physical revealing of the damaged product. Submit this within 24 hours via email or WhatsApp.",
                },
              },
              {
                "@type": "Question",
                name: "Can I cancel my Naaz Art Studio order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Orders can only be cancelled within 6 hours of placement. Once our studio begins mixing, pouring, or painting your piece, the order enters the production pipeline and cannot be cancelled or modified.",
                },
              },
            ],
          }),
        }}
      />

      {/* ── PAGE HEADER ── */}
      <header className="page-header">
        <span className="eyebrow">Studio Policies</span>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginTop: "6px" }}>
          Shipping, Replacement &amp; Cancellation Policy
        </h1>
        <p className="lede" style={{ margin: "10px auto 0" }}>
          Every piece is handmade to order. Please read these policies carefully
          before placing your order.
        </p>
      </header>

      <div
        className="container"
        style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 72px" }}
      >
        {/* ── SECTION 1: SHIPPING ── */}
        <section style={{ marginBottom: "52px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            1. Shipping &amp; Processing Times
          </h2>
          <p className="body-text" style={{ marginBottom: "20px" }}>
            Every product at Naaz Art Studio is poured, finished, or painted
            completely by hand by an independent artist. Because we reject mass
            factory production, we appreciate your patience with our slow,
            intentional crafting process.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
            <li style={{ marginBottom: "14px" }}>
              <strong>Standard Minimalist Collection (Tier 2) —</strong> Orders
              are processed, packed, and dispatched within{" "}
              <strong>3 to 5 business days</strong>.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Luxury Hand-Painted Collection (Tier 1) —</strong> Because
              these custom pieces require meticulous fine-art painting, curing,
              and glazing layers, please allow{" "}
              <strong>5 to 7 business days</strong> for dispatch.
            </li>
            <li style={{ marginBottom: "14px" }}>
              <strong>Delivery Timelines —</strong> Once shipped, domestic orders
              across India typically arrive within{" "}
              <strong>4 to 7 business days</strong>, depending on your location.
              You will receive a tracking link via email or WhatsApp as soon as
              your package leaves our studio.
            </li>
          </ul>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--line)", marginBottom: "52px" }} />

        {/* ── SECTION 2: RETURNS & REPLACEMENT ── */}
        <section style={{ marginBottom: "52px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            2. Returns &amp; Replacement Policy
          </h2>
          <p className="body-text" style={{ marginBottom: "16px" }}>
            To protect our small studio margins, we follow a strict{" "}
            <strong>No-Return and No-Exchange policy</strong>. Because our items
            are unique artisan creations, we cannot accept returns based on a
            change of mind.
          </p>
          <p className="body-text" style={{ marginBottom: "24px" }}>
            However, your peace of mind is incredibly important to us. We offer
            full replacements or refunds under the following strict safety
            guidelines:
          </p>

          <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>
            Damaged Upon Arrival? We&apos;ve Got You Covered.
          </h3>
          <p className="body-text" style={{ marginBottom: "24px" }}>
            Concrete and eco-resin functional art is structurally durable, but
            transit can occasionally be harsh. If your product arrives broken or
            damaged, we will gladly arrange a{" "}
            <strong>free replacement of the same design</strong> — or a{" "}
            <strong>full refund</strong> if the item is an unrepeatable Tier 1
            custom piece.
          </p>

          <div
            style={{
              background: "var(--tone-8, #fff8f0)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-card, 12px)",
              padding: "24px 28px",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>
              ⚠️ Unboxing Video Requirement — Mandatory
            </h3>
            <p className="body-text" style={{ marginBottom: "14px" }}>
              To qualify for a damage replacement or refund, you must provide a{" "}
              <strong>continuous, unedited unboxing video</strong>.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
              <li style={{ marginBottom: "10px" }}>
                ◈ The video must clearly show the <strong>courier label on the package</strong> before opening.
              </li>
              <li style={{ marginBottom: "10px" }}>
                ◈ The video must be filmed from the very{" "}
                <strong>first cut of the outer tape</strong> down to the physical
                revealing of the broken product.
              </li>
              <li style={{ marginBottom: "10px" }}>
                ◈ Please email this video or share it directly on our{" "}
                <strong>WhatsApp business number</strong> within{" "}
                <strong>24 hours</strong> of receiving the delivery.
              </li>
            </ul>
            <p className="body-text" style={{ fontSize: "0.88rem", color: "var(--muted, #888)" }}>
              In the absence of a continuous unboxing video, we cannot process a
              claim with our shipping partner, and no replacement or refund will
              be issued.
            </p>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--line)", marginBottom: "52px" }} />

        {/* ── SECTION 3: CANCELLATIONS ── */}
        <section style={{ marginBottom: "52px" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            3. Order Cancellations
          </h2>
          <p className="body-text" style={{ marginBottom: "12px" }}>
            Orders can only be cancelled <strong>within 6 hours of placement</strong>.
          </p>
          <p className="body-text">
            Once our studio begins mixing, pouring, or painting your chosen
            piece after this window, the order enters the production pipeline and
            <strong> cannot be cancelled or modified</strong>.
          </p>
        </section>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <p className="body-text" style={{ marginBottom: "20px" }}>
            Have a question about your order?
          </p>
          <Link href="/contact" className="btn btn-clay">
            Contact the studio
          </Link>
        </div>
      </div>
    </>
  );
}
