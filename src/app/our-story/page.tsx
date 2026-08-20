import Link from "next/link";

export const metadata = {
  title: "Our Story — Naaz Art Studio | Handmade Concrete & Eco-Resin Art",
  description:
    "Naaz Art Studio was founded by Naaz — a fine-arts graduate and sculptor who traded burnout for concrete and eco resin. Discover the story behind every handmade tray, jar, and vase, and learn what makes our functional decor truly one of a kind.",
};

export default function OurStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Naaz",
            "jobTitle": "Founder & Fine Artist",
            "worksFor": {
              "@type": "Organization",
              "name": "Naaz Art Studio",
              "url": "https://naazarts.com",
              "description":
                "Independent, artist-led functional decor studio handcrafting concrete and eco-resin trays, jars, and vases in India.",
              "sameAs": ["https://instagram.com/shop.naazarts"]
            },
            "description":
              "Fine-arts graduate specialising in painting and sculpture, and founder of Naaz Art Studio — a handmade concrete and eco-resin functional decor studio."
          }),
        }}
      />

      {/* ── PAGE HEADER ── */}
      <header className="page-header">
        <h1 style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}>
          The Evolution of the Canvas
        </h1>
        <p className="lede" style={{ margin: "12px auto 0" }}>
          How a fine-arts degree, creative burnout, and one accidental hobby
          gave birth to Naaz Art Studio.
        </p>
      </header>

      {/* ── HERO IMAGE ── */}
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          className="story-hero-image organic-frame"
          style={{ marginBottom: "48px" }}
        ></div>
      </div>

      {/* ── PARAGRAPH 1: Origins ── */}
      <div className="story-body-container">
        <p className="body-text">
          For as long as I can remember, my hands have been driven by a deep
          need to shape raw elements. As a child, it was clay modelling — a
          quiet obsession that filled my school years with medals, awards, and a
          dream of turning raw earth into art. That passion naturally guided me
          to art school, where I spent four intense years earning my degree in
          fine arts, specialising in painting.
        </p>
      </div>

      {/* ── SPLIT 1: Burnout ── */}
      <div className="story-split-container">
        <div className="story-split">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-1)" }}
          ></div>
          <p className="body-text">
            But trying to make a living purely off the canvas left me deeply
            burnt out. I found myself trapped in a relentless cycle of chasing
            impossible perfectionism and constantly pushing out content — running
            a race that was slowly killing my creative spirit. Life has a way of
            breaking you just enough to reshape you, and for me that turning
            point arrived through a small, accidental hobby: making candles.
          </p>
        </div>
      </div>

      {/* ── SPLIT 2: The discovery ── */}
      <div className="story-split-container">
        <div className="story-split reverse">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-2)" }}
          ></div>
          <p className="body-text">
            While experimenting in my home studio, I grew deeply frustrated by
            the lack of premium, character-filled jars available for my
            creations. So I took a risk — I decided to make my own vessels out
            of concrete. And that is when I discovered eco resin, and there is
            no going back.
          </p>
        </div>
      </div>

      {/* ── SPLIT 3: The breakthrough ── */}
      <div className="story-split-container" style={{ paddingBottom: "56px" }}>
        <div className="story-split">
          <div
            className="ph organic-frame"
            style={{ background: "var(--tone-6)" }}
          ></div>
          <p className="body-text">
            Without realising it, that experimental project unlocked the dormant
            childhood love for pottery and clay modelling that had been resting
            inside me all along — all without needing a massive industrial kiln.
            Pouring concrete in multiple, fluid colours completely cured my fear
            of perfectionism and transformed pressure into pure curiosity. Every
            time a new piece slips out of its mould, nature&apos;s earthy, muted
            tones surprise me with their organic beauty. Replacing canvas with
            concrete didn&apos;t kill the painter inside me; it gave her a
            brand-new, indestructible foundation to build upon.
          </p>
        </div>
      </div>

      {/* ── ABOUT THE STUDIO ── */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <span className="eyebrow">Behind the Studio Canvas</span>
          <h2 style={{ margin: "8px 0 20px", fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}>
            Welcome to Naaz Art Studio
          </h2>
          <p className="body-text" style={{ marginBottom: "18px" }}>
            Founded by Naaz, Naaz Art Studio is an independent, artist-led
            functional decor studio that rejects mass industrial factory lines in
            favour of the slow, intentional warmth of the human touch.
          </p>
          <p className="body-text" style={{ marginBottom: "18px" }}>
            We believe art shouldn&apos;t be locked away in distant galleries or
            sketchbooks — it should live on the vanities we use every morning,
            the coffee tables we sit by, and the spaces where our families
            gather. Every single tray, jar, and vase created in our studio is
            poured, finished, or hand-painted with deep intention, prayer, and
            care.
          </p>
          <p className="body-text" style={{ marginBottom: "24px" }}>
            Our collections are carefully curated into distinct experiences to
            honour your home:
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
            <li style={{ marginBottom: "16px" }}>
              <strong>The Minimalist —</strong> Poured in soft, muted palettes
              inspired by nature, these everyday staples are thoroughly sealed to
              be waterproof, spill-proof, and heat-resistant, and fitted with
              anti-slip bases for flawless daily utility.
            </li>
            <li style={{ marginBottom: "16px" }}>
              <strong>The Nostalgia Collectibles —</strong> Our signature tier,
              where concrete becomes canvas. These premium heirloom pieces are
              hand-painted by our founder Naaz to capture fleeting moments of
              light play, dancing shadows, and nostalgic memories.
            </li>
            <li style={{ marginBottom: "16px" }}>
              <strong>The Studio Experience —</strong> Monthly offline and online
              concrete art and paint masterclasses designed to welcome our
              community into the slow, healing ritual of making.
            </li>
          </ul>
          <p className="body-text">
            We don&apos;t use high-speed machines; we use patience. When you
            bring a piece from Naaz Art Studio into your life, you are inviting
            in a truly one-of-a-kind functional masterpiece — designed to make
            your home feel calmer, gentler, and beautifully intentional.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-alt story-cta-section">
        <div className="container story-cta-inner">
          <h2 style={{ fontSize: "1.3rem", marginBottom: "14px" }}>
            Explore the studio
          </h2>
          <p
            className="body-text"
            style={{
              marginBottom: "26px",
              maxWidth: "50ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From handmade concrete trays and heirloom hand-painted vases to
            community workshops — every piece begins with intention and ends in
            your home.
          </p>
          <Link href="/shop" className="btn btn-clay">
            Shop the collection
          </Link>
        </div>
      </section>
    </>
  );
}
