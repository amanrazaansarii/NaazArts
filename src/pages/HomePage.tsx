import React from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { useStore } from '../store/useStore';
import { Sparkles, ArrowRight, Flame, Layers, Award, SlidersHorizontal, Check } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'shop' | 'b2b' | 'about') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { setActiveCategory, openInquiry } = useStore();

  const featuredProducts = PRODUCTS.slice(0, 6);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    onNavigate('shop');
  };

  return (
    <div>
      {/* Hero Section — Asymmetrical Left-Aligned Editorial Balance */}
      <section style={{ padding: '4rem 0 5rem', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-sand)', padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border-stone)', width: 'fit-content' }}>
              <Sparkles size={14} color="var(--color-terracotta)" />
              <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Hand-Poured with Intentions
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)', color: 'var(--color-primary)', lineHeight: 1.15 }}>
              Intention Molded in <span style={{ color: 'var(--color-terracotta)', fontStyle: 'italic' }}>Small Batch</span> Concrete
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.75', maxWidth: '58ch' }}>
              Premium concrete decor for home aesthetic lovers, candle makers, and art enthusiasts. Explore our collection of hand-poured trays, vessels, candle holders, vases, and DIY project kits.
            </p>

            {/* Target Persona Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.9rem', margin: '0.4rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                <Check size={16} color="var(--color-terracotta)" />
                <span>Small Business B2B Wholesale</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                <Check size={16} color="var(--color-terracotta)" />
                <span>Wax-Safe Candle Vessels</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                <Check size={16} color="var(--color-terracotta)" />
                <span>Hand-Painted Customization</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                <Check size={16} color="var(--color-terracotta)" />
                <span>Affordable Premium Quality</span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.6rem' }}>
              <button onClick={() => onNavigate('shop')} className="btn btn-primary">
                <span>Explore Shop Catalog</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={() => onNavigate('b2b')} className="btn btn-terracotta">
                <Flame size={16} />
                <span>Candle Makers / B2B</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Visual Space */}
          <div style={{ position: 'relative' }}>
            <ImagePlaceholder
              label="NaazArts Signature Concrete Collection"
              dimensions="1200 x 900 • Hero Visual Space"
              aspectRatio="4 / 3"
            />
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-sand-light)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              Curated Collections
            </span>
            <h2 style={{ marginTop: '0.3rem' }}>Explore Hand-Poured Categories</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.6rem' }}>
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.4rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="category-card"
              >
                <div style={{ width: '100%', height: '145px', marginBottom: '1.2rem' }}>
                  <ImagePlaceholder label={cat.name} dimensions="Category Space" />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-terracotta)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>View Products</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestseller Small Batch Drops */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                Handmade In Small Batches
              </span>
              <h2 style={{ marginTop: '0.2rem' }}>Featured Concrete Creations</h2>
            </div>

            <button onClick={() => onNavigate('shop')} className="btn btn-outline btn-sm">
              <span>View Full Store Catalog</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* B2B & Wholesale Candle Maker Spotlight Banner */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-sand-light)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-terracotta-light)', fontWeight: 700 }}>
              B2B & Wholesale Supply
            </span>
            <h2 style={{ color: 'var(--color-sand)', fontSize: '2.4rem', margin: '0.4rem 0 1.2rem' }}>
              Calling Candle Makers & Small Business Owners
            </h2>
            <p style={{ color: 'var(--color-stone)', fontSize: '0.96rem', lineHeight: '1.75', marginBottom: '1.8rem', maxWidth: '56ch' }}>
              Searching for premium yet affordable concrete jars for your candle line? NaazArts provides custom-poured, wax-sealed, and heat-resistant concrete vessels with volume bulk discounts starting at 50 units.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: 'var(--color-sand-light)' }}>
                <Flame size={16} color="var(--color-terracotta-light)" />
                <span>Internal Wax-Safe Sealing (Heat Tested up to 250°F)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: 'var(--color-sand-light)' }}>
                <Layers size={16} color="var(--color-terracotta-light)" />
                <span>Custom Finishes (Solid Tones, Marbled, Hand-Painted Detailing)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.9rem', color: 'var(--color-sand-light)' }}>
                <Award size={16} color="var(--color-terracotta-light)" />
                <span>Bulk Wholesale Tier: Up to 60% discount on volume orders</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('b2b')} className="btn btn-terracotta">
                <span>View B2B Wholesale Specs</span>
              </button>
              <button onClick={() => openInquiry('Custom Bulk Decor')} className="btn btn-outline" style={{ color: 'var(--color-sand)', borderColor: 'var(--color-stone)' }}>
                <SlidersHorizontal size={16} />
                <span>Request Custom Bulk Quote</span>
              </button>
            </div>
          </div>

          <div>
            <ImagePlaceholder
              label="B2B Candle Vessel Wholesale Batch"
              dimensions="1000 x 800 • Concrete Jars View"
              aspectRatio="4 / 3"
            />
          </div>

        </div>
      </section>

      {/* Custom Order Request Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="text-center" style={{ marginBottom: '2.2rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
              Customizations & Hand-Painted Orders
            </span>
            <h2 style={{ marginTop: '0.3rem' }}>Have a Unique Design or Bulk Order in Mind?</h2>
            <p style={{ marginTop: '0.6rem', margin: '0.6rem auto 0' }}>
              Whether you need hand-painted patterns, custom brand debossing, or specific color matching, send us your request below.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2.4rem', boxShadow: 'var(--shadow-sm)' }}>
            <button
              onClick={() => openInquiry()}
              className="btn btn-terracotta"
              style={{ width: '100%', padding: '1.15rem', fontSize: '0.95rem' }}
            >
              <SlidersHorizontal size={18} />
              <span>Open Custom & Wholesale Quote Request Form</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
