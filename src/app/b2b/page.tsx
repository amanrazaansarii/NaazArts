'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { Flame, ShieldCheck, Award, Layers, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export default function B2BPage() {
  const { openInquiry } = useStore();

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Header Banner */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-sand)', padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.2rem', border: '1px solid var(--color-border-stone)' }}>
            <Flame size={15} color="var(--color-terracotta)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Candle Maker & Small Business Portal
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4rem)', marginBottom: '1.2rem' }}>
            Hand-Poured Concrete Vessels for <span style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>Boutique Brands</span>
          </h1>

          <p style={{ fontSize: '1.08rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            We understand the exact technical needs of candle makers. Our concrete jars are dense-poured, internally sealed with heat & wax-safe sealant, and produced in batch runs with volume discount pricing starting at 25 units.
          </p>
        </div>

        {/* Technical Specs 4-Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4.5rem' }}>
          <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <ShieldCheck size={32} color="var(--color-terracotta)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Wax-Safe Internal Sealant</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
              Coated internally with non-toxic, heat-resistant sealers to prevent fragrance oil bleed and soy/coconut wax absorption.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <Flame size={32} color="var(--color-terracotta)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thermal Heat Rated (250°F)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
              Formulated with high-strength cementitious blends that withstand melt pools without micro-cracking during extended candle burns.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <Layers size={32} color="var(--color-terracotta)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Custom Color & Finishes</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
              Select from solid natural tones, marbled swirl finishes, or request hand-painted metallic gold rims to match your brand palette.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <Award size={32} color="var(--color-terracotta)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Logo Debossing & Molds</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
              Need your brand logo debossed into the bottom or front of the vessel? We design custom silicone molds for volume production orders.
            </p>
          </div>
        </div>

        {/* Volume Discount Table */}
        <section style={{ backgroundColor: 'var(--color-sand-light)', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              Wholesale Pricing Tiers
            </span>
            <h2 style={{ marginTop: '0.2rem' }}>Volume Bulk Discount Rates</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
              Volume pricing automatically applies when ordering in batch quantities.
            </p>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px', backgroundColor: 'var(--color-card-bg)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-sand)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Order Volume Tier</th>
                  <th style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Discount Rate</th>
                  <th style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Avg Vessel Unit Price</th>
                  <th style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Customization Included</th>
                  <th style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Lead Time</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>B2B Tier 1 (25 - 50 units)</td>
                  <td style={{ padding: '1.1rem', fontWeight: 600 }}>30% Off Retail</td>
                  <td style={{ padding: '1.1rem', fontWeight: 700 }}>$12.60 / unit</td>
                  <td style={{ padding: '1.1rem' }}>Color Blend Selection</td>
                  <td style={{ padding: '1.1rem' }}>5 - 7 Business Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(239, 224, 211, 0.55)' }}>
                  <td style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>B2B Tier 2 (50 - 200 units)</td>
                  <td style={{ padding: '1.1rem', fontWeight: 600 }}>52% Off Retail</td>
                  <td style={{ padding: '1.1rem', fontWeight: 700 }}>$8.50 / unit</td>
                  <td style={{ padding: '1.1rem' }}>Custom Color + Hand-Paint</td>
                  <td style={{ padding: '1.1rem' }}>7 - 10 Business Days</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Volume Production (500+ units)</td>
                  <td style={{ padding: '1.1rem', fontWeight: 600 }}>Up to 60% Off</td>
                  <td style={{ padding: '1.1rem', fontWeight: 700 }}>Custom Quote</td>
                  <td style={{ padding: '1.1rem' }}>Custom Mold Debossing</td>
                  <td style={{ padding: '1.1rem' }}>2 - 3 Weeks Batch Pour</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Visual Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center', marginBottom: '4.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              Artisanal Batch Production
            </span>
            <h2 style={{ fontSize: '2.2rem', margin: '0.4rem 0 1rem' }}>Crafted for Luxury Candle Presentation</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Whether you specialize in wooden wicks, soy wax, or essential oil scented candles, our heavy, tactile concrete vessels offer a premium feel that sets your brand apart on retail shelves and Instagram.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-terracotta)" />
                <span>Heavyweight tactile feel that communicates luxury</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-terracotta)" />
                <span>Zero seepage guarantee with dual-layer internal seal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-terracotta)" />
                <span>Custom color matching to your brand palette</span>
              </div>
            </div>
          </div>

          <div>
            <ImagePlaceholder label="Wholesale Candle Jar Batch View" dimensions="B2B Studio Production" aspectRatio="4 / 3" />
          </div>
        </div>

        {/* Action Callout */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-sand-light)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-sand)', fontSize: '2.2rem', marginBottom: '0.6rem' }}>Ready to Pour Your Wholesale Batch?</h2>
          <p style={{ color: 'var(--color-stone)', maxWidth: '550px', margin: '0 auto 1.8rem', lineHeight: '1.7' }}>
            Get in touch with our studio to request samples, custom mold designs, or volume pricing quotes.
          </p>
          <button onClick={() => openInquiry('B2B Candle Vessel Quote')} className="btn btn-terracotta" style={{ padding: '1rem 2.2rem' }}>
            <SlidersHorizontal size={18} />
            <span>Request B2B Wholesale Quote</span>
          </button>
        </div>

      </div>
    </div>
  );
}
