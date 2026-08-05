import React from 'react';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { useStore } from '../store/useStore';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openInquiry } = useStore();

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Header Story */}
        <div style={{ maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-sand)', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)', marginBottom: '1rem' }}>
            <Sparkles size={14} color="var(--color-terracotta)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Our Philosophy & Craft
            </span>
          </div>

          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Pouring Small Batches with <span style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>Intentions</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            At NaazArts, we believe functional decor should feel grounded, tactile, and deeply intentional. Every single tray, jar, vessel, and vase is hand-poured in small batches, cured patiently, hand-sanded, and sealed for long-lasting utility.
          </p>
        </div>

        {/* Visual Studio Placeholder Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <ImagePlaceholder label="Small Batch Pouring & Curing" dimensions="Pouring Station" aspectRatio="4 / 3" />
          <ImagePlaceholder label="Hand Sanding & Finishing" dimensions="Finishing View" aspectRatio="4 / 3" />
          <ImagePlaceholder label="Sealing & Inspection" dimensions="Quality Check" aspectRatio="4 / 3" />
        </div>

        {/* Who We Serve */}
        <section style={{ backgroundColor: 'var(--color-sand-light)', padding: '4rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <h2 style={{ fontSize: '2.2rem' }}>Who We Pour For</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
              Whether you're decorating your home, launching a candle brand, or crafting your next DIY project.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For Candle Makers & Brands
              </span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.4rem 0 0.6rem' }}>B2B Vessel Solutions</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Wax-safe, heat-resistant cylinder and fluted concrete jars designed to elevate boutique candle lines with custom colors & volume pricing.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For Home Decor Lovers
              </span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.4rem 0 0.6rem' }}>Minimalist Aesthetic Decor</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Hand-poured trays, catchalls, taper candle holders, and sculptural vases designed to bring warm organic earth tones to coffee tables & vanities.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For DIY Lovers & Hobbyists
              </span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.4rem 0 0.6rem' }}>Complete DIY Craft Kits</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Searching for your next weekend art project? Our DIY kits come with specialized concrete powder, reusable silicone molds, and pigments.
              </p>
            </div>
          </div>
        </section>

        {/* Brand & Website Design System Palette */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              Brand & UI Aesthetic System
            </span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.4rem 0 1rem' }}>Signature Website Color Palette</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              The NaazArts digital experience is crafted using a curated, warm earthy color palette designed to evoke the organic warmth of hand-poured stone and clay.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#59564C', border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>#59564C — Earthy Charcoal (Primary UI Neutral)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#98726F', border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>#98726F — Rose Clay (Accent & CTAs)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#C2C0B1', border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>#C2C0B1 — Concrete Stone Mist (Subtle Borders & Highlights)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#EFE0D3', border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>#EFE0D3 — Warm Sand (Section Panels & Badges)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FFFAF2', border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>#FFFAF2 — Alabaster Cream (Main Website Background)</span>
              </div>
            </div>
          </div>

          <div>
            <ImagePlaceholder label="Color Palette & Hand-Painted Custom Swatches" dimensions="Color Palette View" aspectRatio="1 / 1" />
          </div>
        </div>

        {/* Action Banner */}
        <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', padding: '3rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Want a Custom Order or Bulk Production?</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
            We're always open to hand-painted customizations, corporate gifts, and B2B volume orders.
          </p>
          <button onClick={() => openInquiry('Brand Story Inquiry')} className="btn btn-terracotta">
            <SlidersHorizontal size={16} />
            <span>Contact Us for Custom Orders</span>
          </button>
        </div>

      </div>
    </div>
  );
};
