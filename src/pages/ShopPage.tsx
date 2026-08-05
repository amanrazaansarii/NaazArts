import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { Search, Package } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { activeCategory, setActiveCategory } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [b2bOnly, setB2bOnly] = useState(false);

  // Filter logic
  let filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesB2B = b2bOnly ? p.b2bSuitable : true;
    return matchesCategory && matchesSearch && matchesB2B;
  });

  // Sort logic
  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
            Small Batch Hand-Poured Catalog
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginTop: '0.2rem' }}>Concrete Decor & Candle Vessels</h1>
          <p style={{ maxWidth: '620px', margin: '0.6rem auto 0', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            Each piece is crafted in small batches with intentional concrete density, sealed for wax/water safety, and backed by retail and wholesale bulk pricing.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.8rem' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.65rem 1.45rem',
                fontSize: '0.82rem',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                borderRadius: 'var(--radius-full)',
                border: activeCategory === cat.id ? '2px solid var(--color-terracotta)' : '1px solid var(--color-border)',
                backgroundColor: activeCategory === cat.id ? 'var(--color-terracotta)' : 'var(--color-bg)',
                color: activeCategory === cat.id ? 'var(--color-white)' : 'var(--color-primary)',
                transition: 'all var(--transition-fast)',
                boxShadow: activeCategory === cat.id ? 'var(--shadow-terracotta)' : 'none'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.2rem',
            padding: '1.1rem 1.5rem',
            backgroundColor: 'var(--color-sand)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            marginBottom: '3rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', backgroundColor: 'white', padding: '0.5rem 0.95rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', minWidth: '240px', flexGrow: 1, maxWidth: '380px' }}>
            <Search size={16} color="var(--color-primary)" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%', color: 'var(--color-primary)' }}
            />
          </div>

          {/* Checkbox for B2B only */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={b2bOnly}
              onChange={(e) => setB2bOnly(e.target.checked)}
              style={{ accentColor: 'var(--color-terracotta)', width: '16px', height: '16px' }}
            />
            <span>Show B2B Candle Vessels & Bulk Suitable Only</span>
          </label>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sort By:</span>
            <select
              className="select-custom"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="featured">Featured Batch</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <Package size={48} color="var(--color-stone)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}>No Products Found</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
              Try adjusting your category filter or search terms.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.2rem' }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
