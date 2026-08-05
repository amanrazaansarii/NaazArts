import React from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { X, Search, Eye } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, toggleSearch, searchQuery, setSearchQuery, setQuickViewProduct } = useStore();

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={toggleSearch}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', paddingTop: '1.5rem' }}>
        <button
          onClick={toggleSearch}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', color: 'var(--color-primary)' }}
        >
          <X size={24} />
        </button>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Search NaazArts Collection</h3>

        {/* Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', border: '1.5px solid var(--color-terracotta)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem', backgroundColor: 'white', marginBottom: '1.5rem' }}>
          <Search size={20} color="var(--color-terracotta)" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name (e.g. jar, tray, candle holder, vase, diy kit)..."
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.95rem', color: 'var(--color-primary)' }}
          />
        </div>

        {/* Results */}
        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
              No products found matching "{searchQuery}".
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    toggleSearch();
                    setQuickViewProduct(p);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-card-bg)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                    <ImagePlaceholder label={p.title} dimensions="60x60" />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-terracotta)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {p.categoryLabel}
                    </span>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{p.title}</h4>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      ${p.price.toFixed(2)}
                    </span>
                  </div>

                  <button className="btn btn-outline btn-sm">
                    <Eye size={14} />
                    <span>View</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
