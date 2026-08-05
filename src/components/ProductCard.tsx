import React from 'react';
import { Product } from '../data/products';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useStore } from '../store/useStore';
import { Eye, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setQuickViewProduct, addToCart, openInquiry } = useStore();

  return (
    <div className="product-card">
      {/* Image Placeholder (Blank space for image as requested) */}
      <div className="product-card-img-wrap" onClick={() => setQuickViewProduct(product)} style={{ cursor: 'pointer' }}>
        {product.badge && (
          <span className={`product-badge ${product.b2bSuitable ? 'product-badge-b2b' : ''}`}>
            {product.badge}
          </span>
        )}
        <ImagePlaceholder
          label={product.title}
          dimensions={product.dimensions}
          aspectRatio="1 / 1"
        />
      </div>

      {/* Product Information Body */}
      <div className="product-card-body">
        <span className="product-category">{product.categoryLabel}</span>
        
        <h3
          className="product-title"
          onClick={() => setQuickViewProduct(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>

        <p className="product-description">{product.shortDesc}</p>

        {/* Finish / Swatches Available */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.3rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>Finishes:</span>
          {product.finishes.slice(0, 3).map((finish, idx) => (
            <span
              key={idx}
              title={finish}
              style={{
                fontSize: '0.65rem',
                backgroundColor: 'var(--color-sand)',
                color: 'var(--color-primary)',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid var(--color-border)'
              }}
            >
              {finish.split(' ')[0]}
            </span>
          ))}
          {product.finishes.length > 3 && (
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-light)' }}>
              +{product.finishes.length - 3}
            </span>
          )}
        </div>

        {/* Pricing Row */}
        <div className="product-price-row">
          <div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            {product.b2bBulkPrice && (
              <div className="product-b2b-tier">
                B2B Bulk: <strong>${product.b2bBulkPrice.toFixed(2)}</strong> (50+ units)
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setQuickViewProduct(product)}
              className="btn btn-outline btn-sm"
              title="Quick View Details"
              style={{ padding: '0.45rem 0.65rem' }}
            >
              <Eye size={15} />
            </button>

            <button
              onClick={() => addToCart(product)}
              className="btn btn-terracotta btn-sm"
              title="Add to Cart"
              style={{ padding: '0.45rem 0.85rem' }}
            >
              <Plus size={15} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
