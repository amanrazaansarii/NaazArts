import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ImagePlaceholder } from './ImagePlaceholder';
import { X, ShoppingBag, ShieldCheck, Flame, Layers } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, openInquiry } = useStore();
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [isB2B, setIsB2B] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [customNotes, setCustomNotes] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentFinish = selectedFinish || quickViewProduct.finishes[0];
  const unitPrice = isB2B && quickViewProduct.b2bBulkPrice
    ? quickViewProduct.b2bBulkPrice
    : quickViewProduct.price;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentFinish, isB2B, customNotes);
    setQuickViewProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            padding: '0.4rem',
            color: 'var(--color-primary)'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Image Placeholder Column */}
          <div>
            <ImagePlaceholder
              label={quickViewProduct.title}
              dimensions={quickViewProduct.dimensions}
              aspectRatio="1 / 1"
            />
            <div style={{ marginTop: '0.8rem', display: 'flex', gap: '0.6rem' }}>
              <ImagePlaceholder label="Detail View 1" dimensions="Detail" aspectRatio="1 / 1" />
              <ImagePlaceholder label="Detail View 2" dimensions="Detail" aspectRatio="1 / 1" />
            </div>
          </div>

          {/* Product Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <span className="product-category">{quickViewProduct.categoryLabel}</span>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: '0.2rem' }}>{quickViewProduct.title}</h3>
            </div>

            {/* Pricing Section */}
            <div style={{ backgroundColor: 'var(--color-sand)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  ${unitPrice.toFixed(2)}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  per unit {isB2B ? '(B2B Wholesale Rate)' : '(Retail)'}
                </span>
              </div>

              {quickViewProduct.b2bBulkPrice && (
                <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid var(--color-border)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-terracotta)' }}>
                    <input
                      type="checkbox"
                      checked={isB2B}
                      onChange={(e) => {
                        setIsB2B(e.target.checked);
                        if (e.target.checked && quantity < 50) setQuantity(50);
                      }}
                      style={{ accentColor: 'var(--color-terracotta)' }}
                    />
                    <span>Apply B2B Wholesale Pricing Tier (${quickViewProduct.b2bBulkPrice.toFixed(2)} / unit for 50+ units)</span>
                  </label>
                </div>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              {quickViewProduct.fullDesc}
            </p>

            {/* Specs Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', backgroundColor: 'var(--color-card-bg)', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <ShieldCheck size={14} color="var(--color-terracotta)" />
                <span>Sealer: Wax & Water Safe</span>
              </div>

              {quickViewProduct.popularForCandles && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', backgroundColor: 'var(--color-card-bg)', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                  <Flame size={14} color="var(--color-terracotta)" />
                  <span>Heat Rated up to 250°F</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', backgroundColor: 'var(--color-card-bg)', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                <Layers size={14} color="var(--color-primary)" />
                <span>Dimensions: {quickViewProduct.dimensions}</span>
              </div>
            </div>

            {/* Finish Selector */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.4rem' }}>
                Select Concrete Finish / Tone:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {quickViewProduct.finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border: currentFinish === finish ? '2px solid var(--color-terracotta)' : '1px solid var(--color-border)',
                      backgroundColor: currentFinish === finish ? 'var(--color-sand)' : 'var(--color-bg)',
                      color: 'var(--color-primary)',
                      fontWeight: currentFinish === finish ? 700 : 400
                    }}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Hand-painted / Customization Request Field */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                Customization / Hand-Painting Request Notes (Optional):
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Add gold foil rim accent, or specific shade preference"
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-white)'
                }}
              />
            </div>

            {/* Quantity Selector & Action Button */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.6rem 0.9rem', fontSize: '1rem', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.6rem 0.9rem', fontSize: '1rem', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-terracotta"
                style={{ flexGrow: 1 }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart — ${(unitPrice * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* B2B Custom Mold Link */}
            {quickViewProduct.b2bSuitable && (
              <div style={{ textAlign: 'center', marginTop: '0.4rem' }}>
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    openInquiry(quickViewProduct.title);
                  }}
                  style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Need Custom Mold Embossing or 500+ Bulk Units? Request B2B Quote
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
