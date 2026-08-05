import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { useStore } from '../store/useStore';
import { Flame, ShieldCheck, Layers, Award, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';

export const B2BPage: React.FC = () => {
  const { openInquiry } = useStore();
  const b2bProducts = PRODUCTS.filter((p) => p.b2bSuitable);

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        
        {/* Header Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              B2B & Wholesale Supply Program
            </span>
            <h1 style={{ fontSize: '2.8rem', marginTop: '0.2rem', color: 'var(--color-primary)' }}>
              Concrete Candle Jars & Vessels for <span style={{ color: 'var(--color-terracotta)' }}>Boutique Candle Brands</span>
            </h1>
            <p style={{ marginTop: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '1.02rem' }}>
              Elevate your candle line with hand-poured, ultra-smooth concrete vessels. We partner with small business owners, candle makers, and interior stylists to deliver high-quality, wax-safe vessels with wholesale discounts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
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
        <section style={{ backgroundColor: 'var(--color-sand-light)', padding: '3.5rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Engineered for Candle Maker Precision</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>Every jar undergoes strict quality checks for flame safety and thermal strength.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Flame size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Internal Wax-Safe Sealing</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Non-toxic, heat-resistant sealers prevent wax seepage, fragrance absorption, and soot stains up to 250°F.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Layers size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Custom Color Palettes</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Choose from Charcoal (#59564C), Terracotta (#98726F), Concrete Greige (#C2C0B1), Warm Sand (#EFE0D3), or custom marbled blends.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <Award size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Logo Debossing & Branding</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Add your brand’s emblem or logo directly into the concrete mold for a signature custom product line.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              <ShieldCheck size={28} color="var(--color-terracotta)" style={{ marginBottom: '0.8rem' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>Smooth Tactile Finish</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Hand-sanded rim and bottom with protective silicone pad options to preserve furniture surfaces.
              </p>
            </div>
          </div>
        </section>

        {/* Wholesale Pricing Structure Overview */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>B2B Volume Pricing Overview</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>Transparent pricing tiers tailored to growing candle businesses.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-sand)', borderBottom: '1px solid var(--color-border)', textAlign: 'left', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                  <th style={{ padding: '1rem' }}>Order Volume</th>
                  <th style={{ padding: '1rem' }}>Discount Tier</th>
                  <th style={{ padding: '1rem' }}>Sample 8oz Jar Unit Price</th>
                  <th style={{ padding: '1rem' }}>Customization Allowed</th>
                  <th style={{ padding: '1rem' }}>Estimated Lead Time</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Retail (1 - 24 units)</td>
                  <td style={{ padding: '1rem' }}>Standard Retail</td>
                  <td style={{ padding: '1rem' }}>$18.00 / unit</td>
                  <td style={{ padding: '1rem' }}>Standard Color Options</td>
                  <td style={{ padding: '1rem' }}>1 - 3 Business Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(239, 224, 211, 0.3)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>B2B Tier 1 (25 - 50 units)</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>30% Off Retail</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>$12.60 / unit</td>
                  <td style={{ padding: '1rem' }}>Color Blend Selection</td>
                  <td style={{ padding: '1rem' }}>5 - 7 Business Days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(239, 224, 211, 0.5)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>B2B Tier 2 (50 - 200 units)</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>52% Off Retail</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>$8.50 / unit</td>
                  <td style={{ padding: '1rem' }}>Custom Color + Hand-Paint</td>
                  <td style={{ padding: '1rem' }}>7 - 10 Business Days</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Volume Production (500+ units)</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Up to 60% Off</td>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>Custom Quote</td>
                  <td style={{ padding: '1rem' }}>Custom Mold Debossing</td>
                  <td style={{ padding: '1rem' }}>2 - 3 Weeks Batch Pour</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* B2B Suitable Product Catalog Grid */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {b2bProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Action Callout */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-sand-light)', padding: '3.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-sand)', fontSize: '2.2rem', marginBottom: '0.6rem' }}>Ready to Launch or Scale Your Candle Brand?</h2>
          <p style={{ color: 'var(--color-stone)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
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
