import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { useStore } from '../store/useStore';
import { Flame, ShieldCheck, Layers, Award, SlidersHorizontal } from 'lucide-react';

export const B2BPage: React.FC = () => {
  const { openInquiry } = useStore();
  const b2bProducts = PRODUCTS.filter((p) => p.b2bSuitable);

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Header Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '3.5rem', alignItems: 'center', marginBottom: '4.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              B2B & Wholesale Supply Program
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginTop: '0.2rem', color: 'var(--color-primary)' }}>
              Concrete Candle Jars & Vessels for <span style={{ color: 'var(--color-terracotta)' }}>Boutique Candle Brands</span>
            </h1>
            <p style={{ marginTop: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.75', fontSize: '1.02rem', maxWidth: '58ch' }}>
              Elevate your candle line with hand-poured, ultra-smooth concrete vessels. We partner with small business owners, candle makers, and interior stylists to deliver high-quality, wax-safe vessels with wholesale discounts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
              <button onClick={() => openInquiry('Candle Jars')} className="btn btn-terracotta">
                <SlidersHorizontal size={16} />
                <span>Request B2B Wholesale Quote</span>
              </button>
            </div>
          </div>

          <div>
            <ImagePlaceholder
              label="NaazArts B2B Concrete Vessel Line"
              dimensions="1200 x 800 • Wholesale Batch View"
              aspectRatio="4 / 3"
            />
          </div>
        </div>

        {/* Why Choose NaazArts Concrete Vessels for Candle Making? */}
        <section style={{ backgroundColor: 'var(--color-sand-light)', padding: '4rem 2.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Engineered for Candle Maker Precision</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>Every jar undergoes strict quality checks for flame safety and thermal strength.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <Flame size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.18rem', marginBottom: '0.4rem' }}>Internal Wax-Safe Sealing</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Non-toxic, heat-resistant sealers prevent wax seepage, fragrance absorption, and soot stains up to 250°F.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <Layers size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.18rem', marginBottom: '0.4rem' }}>Custom Color Palettes</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Choose from solid Charcoal, Terracotta Rose, Concrete Greige, Warm Sand, or custom marbled pigment blends.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <Award size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.18rem', marginBottom: '0.4rem' }}>Logo Debossing & Branding</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Add your brand’s emblem or logo directly into the concrete mold for a signature custom product line.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <ShieldCheck size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.18rem', marginBottom: '0.4rem' }}>Smooth Tactile Finish</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Hand-sanded rim and bottom with protective silicone pad options to preserve furniture surfaces.
              </p>
            </div>
          </div>
        </section>

        {/* Wholesale Pricing Structure Overview */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>B2B Volume Pricing Overview</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>Transparent pricing tiers tailored to growing candle businesses.</p>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-card-bg)', minWidth: '640px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-sand)', borderBottom: '1px solid var(--color-border)', textAlign: 'left', fontSize: '0.82rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <th style={{ padding: '1.1rem' }}>Order Volume</th>
                  <th style={{ padding: '1.1rem' }}>Discount Tier</th>
                  <th style={{ padding: '1.1rem' }}>Sample 8oz Jar Price</th>
                  <th style={{ padding: '1.1rem' }}>Customization</th>
                  <th style={{ padding: '1.1rem' }}>Estimated Lead Time</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1.1rem', fontWeight: 600 }}>Retail (1 - 24 units)</td>
                  <td style={{ padding: '1.1rem' }}>Standard Retail</td>
                  <td style={{ padding: '1.1rem' }}>$18.00 / unit</td>
                  <td style={{ padding: '1.1rem' }}>Standard Options</td>
                  <td style={{ padding: '1.1rem' }}>1 - 3 Business Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(239, 224, 211, 0.35)' }}>
                  <td style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>B2B Tier 1 (25 - 50 units)</td>
                  <td style={{ padding: '1.1rem', fontWeight: 600 }}>30% Off Retail</td>
                  <td style={{ padding: '1.1rem', fontWeight: 700 }}>$12.60 / unit</td>
                  <td style={{ padding: '1.1rem' }}>Color Blend Selection</td>
                  <td style={{ padding: '1.1rem' }}>5 - 7 Business Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(239, 224, 211, 0.55)' }}>
                  <td style={{ padding: '1.1rem', fontWeight 700, color: 'var(--color-terracotta)' }}>B2B Tier 2 (50 - 200 units)</td>
                  <td style={{ padding: '1.1rem', fontWeight 600 }}>52% Off Retail</td>
                  <td style={{ padding: '1.1rem', fontWeight: 700 }}>$8.50 / unit</td>
                  <td style={{ padding: '1.1rem' }}>Custom Color + Hand-Paint</td>
                  <td style={{ padding: '1.1rem' }}>7 - 10 Business Days</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Volume Production (500+ units)</td>
                  <td style={{ padding: '1.1rem', fontWeight 600 }}>Up to 60% Off</td>
                  <td style={{ padding: '1.1rem', fontWeight 700 }}>Custom Quote</td>
                  <td style={{ padding: '1.1rem' }}>Custom Mold Debossing</td>
                  <td style={{ padding: '1.1rem' }}>2 - 3 Weeks Batch Pour</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* B2B Suitable Product Catalog Grid */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                Wholesale Inventory
              </span>
              <h2>B2B & Candle Maker Ready Vessels</h2>
            </div>
            <button onClick={() => openInquiry('B2B Collection')} className="btn btn-terracotta btn-sm">
              <SlidersHorizontal size={14} />
              <span>Inquire for All Items</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {b2bProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Action Callout */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-sand-light)', padding: '3.8rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ color: 'var(--color-sand)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: '0.6rem' }}>Ready to Launch or Scale Your Candle Brand?</h2>
          <p style={{ color: 'var(--color-stone)', maxWidth: '600px', margin: '0 auto 1.8rem', fontSize: '0.96rem', lineHeight: '1.7' }}>
            Tell us about your estimated quantities, desired color palette, or custom mold requirements. Our studio responds within 24 hours.
          </p>
          <button onClick={() => openInquiry('Candle Maker B2B Inquiry')} className="btn btn-terracotta">
            <SlidersHorizontal size={18} />
            <span>Submit B2B Inquiry Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
