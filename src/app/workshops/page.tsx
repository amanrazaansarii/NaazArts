import Link from "next/link";
import { WorkshopsClient } from "./WorkshopsClient";

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

      <WorkshopsClient />

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
