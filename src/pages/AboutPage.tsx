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
        <div style={{ maxWidth: '780px', margin: '0 auto 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-sand)', padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.2rem', border: '1px solid var(--color-border-stone)' }}>
            <Sparkles size={14} color="var(--color-terracotta)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Our Philosophy & Craft
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.2rem' }}>
            Pouring Small Batches with <span style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>Intentions</span>
          </h1>

          <p style={{ fontSize: '1.08rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            At NaazArts, we believe functional decor should feel grounded, tactile, and deeply intentional. Every single tray, jar, vessel, and vase is hand-poured in small batches, cured patiently, hand-sanded, and sealed for long-lasting utility.
          </p>
        </div>

        {/* Visual Studio Placeholder Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', marginBottom: '4.5rem' }}>
          <ImagePlaceholder label="Small Batch Pouring & Curing" dimensions="Pouring Station" aspectRatio="4 / 3" />
          <ImagePlaceholder label="Hand Sanding & Finishing" dimensions="Finishing View" aspectRatio="4 / 3" />
          <ImagePlaceholder label="Sealing & Quality Inspection" dimensions="Quality Check" aspectRatio="4 / 3" />
        </div>

        {/* Who We Serve */}
        <section style={{ backgroundColor: 'var(--color-sand-light)', padding: '4rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem' }}>Who We Pour For</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
              Whether you're decorating your home, launching a candle brand, or crafting your next DIY project.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For Candle Makers & Brands
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.4rem 0 0.6rem' }}>B2B Vessel Solutions</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                Wax-safe, heat-resistant cylinder and fluted concrete jars designed to elevate boutique candle lines with custom colors & volume pricing.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For Home Decor Lovers
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.4rem 0 0.6rem' }}>Minimalist Aesthetic Decor</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                Hand-poured trays, catchalls, taper candle holders, and sculptural vases designed to bring warm organic earth tones to coffee tables & vanities.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                For DIY Lovers & Hobbyists
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.4rem 0 0.6rem' }}>Complete DIY Craft Kits</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                Searching for your next weekend art project? Our DIY kits come with specialized concrete powder, reusable silicone molds, and pigments.
              </p>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.6rem' }}>Want a Custom Order or Bulk Production?</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto 1.8rem', lineHeight: '1.7' }}>
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
