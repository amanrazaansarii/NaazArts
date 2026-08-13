import Link from "next/link";

export const metadata = {
  title: "Workshops — Naaz Arts",
  description:
    "Join a hands-on concrete art workshop — offline in-studio or online via Google Meet.",
};

export default function WorkshopsPage() {
  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Workshops</p>
          <h1>Come make something with your hands</h1>
          <p className="lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Hands-on concrete art sessions — no experience needed. Offline
            in-studio or online over Google Meet.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="workshop-cards-grid">
            <div className="tile" style={{ textAlign: "left", padding: "28px" }}>
              <span className="eyebrow">In person</span>
              <h3 style={{ margin: "8px 0 10px", fontSize: "1.15rem" }}>
                Offline Workshop — Tray &amp; Vase Painting
              </h3>
              <p className="body-text" style={{ marginBottom: "16px" }}>
                Paint your own tray and our brand new vase design, guided start to
                finish. Materials included.
              </p>
              <p className="body-text" style={{ marginBottom: "4px" }}>
                <strong>Date:</strong> [Add date]
              </p>
              <p className="body-text" style={{ marginBottom: "18px" }}>
                <strong>Location:</strong> [Add city / studio address]
              </p>
              <Link href="/contact" className="btn btn-clay">
                Book a seat
              </Link>
            </div>

            <div className="tile" style={{ textAlign: "left", padding: "28px" }}>
              <span className="eyebrow">Online</span>
              <h3 style={{ margin: "8px 0 10px", fontSize: "1.15rem" }}>
                Online Workshop — via Google Meet
              </h3>
              <p className="body-text" style={{ marginBottom: "16px" }}>
                Learn concrete art from home, wherever you are. A materials kit
                ships to you ahead of the live session.
              </p>
              <p className="body-text" style={{ marginBottom: "18px" }}>
                <strong>Next session:</strong> [Add date]
              </p>
              <Link href="/contact" className="btn btn-outline">
                Reserve your spot
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt story-cta-section">
        <div className="container story-cta-inner">
          <h2 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>
            Questions before you book?
          </h2>
          <p className="body-text" style={{ marginBottom: "22px", maxWidth: "50ch", marginLeft: "auto", marginRight: "auto" }}>
            Group sizes, what to bring, refund policy — happy to walk you through
            it.
          </p>
          <Link href="/contact" className="btn btn-sage">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
