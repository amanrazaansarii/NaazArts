import Link from "next/link";

export const metadata = {
  title: "Our Story — Naaz Arts",
  description:
    "From a wedding gift to a whole new craft — the story behind Naaz Arts's handmade concrete art.",
};

export default function OurStoryPage() {
  return (
    <>
      <header className="page-header">
        <h1 style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
          From a wedding gift to a whole new craft
        </h1>
        <p className="lede" style={{ margin: "12px auto 0" }}>
          A candle. A jar. A material I couldn&apos;t put down.
        </p>
      </header>

      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="story-hero-image organic-frame" style={{ marginBottom: "48px" }}></div>
      </div>

      <div className="story-body-container">
        <p className="body-text">
          I didn&apos;t start a concrete business. I started with candles — a wedding
          gift for my best friend, made in December 2024. I&apos;m a fine artist by
          training, so I thought: why not turn candles into art?
        </p>
      </div>

      <div className="story-split-container">
        <div className="story-split">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-1)" }}
          ></div>
          <p className="body-text">
            I couldn&apos;t find candle jars I trusted — safe, premium, made to last. So
            I started making my own, out of concrete. That one decision changed
            everything.
          </p>
        </div>
      </div>

      <div className="story-split-container">
        <div className="story-split reverse">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-2)" }}
          ></div>
          <p className="body-text">
            Turns out, this was never new for me. I&apos;d been sculpting and doing
            pottery since I was a kid, winning awards for it through school.
            Concrete gave me everything clay did — without needing a kiln I could
            never fit into a home studio.
          </p>
        </div>
      </div>

      <div className="story-split-container" style={{ paddingBottom: "56px" }}>
        <div className="story-split">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-6)" }}
          ></div>
          <p className="body-text">
            One of my earliest customers bought candles from me for her own event
            stalls, again and again. Somewhere along the way, we became friends. Now
            she co-hosts workshops with me, across the city.
          </p>
        </div>
      </div>

      <section className="section section-alt story-cta-section">
        <div className="container story-cta-inner">
          <h2 style={{ fontSize: "1.3rem", marginBottom: "14px" }}>
            Where I am now
          </h2>
          <p className="body-text" style={{ marginBottom: "26px", maxWidth: "50ch", marginLeft: "auto", marginRight: "auto" }}>
            From one candle for a friend&apos;s wedding to bulk orders, a growing
            collection, and workshops that fill up in days. Full circle — and just
            getting started.
          </p>
          <Link href="/shop" className="btn btn-clay">
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  );
}
