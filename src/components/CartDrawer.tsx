'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ImagePlaceholder } from './ImagePlaceholder';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart } = useStore();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 75;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      closeCart();
    }, 2800);
  };

  return (
    <div className="modal-overlay" onClick={closeCart} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: '1px solid var(--color-border)',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        {/* Cart Header */}
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.3rem' }}>Your Bag ({cart.reduce((t, i) => t + i.quantity, 0)})</h3>
          </div>
          <button onClick={closeCart} style={{ padding: '0.4rem', color: 'var(--color-primary)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ backgroundColor: 'var(--color-sand)', padding: '0.8rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>
            <Truck size={16} color="var(--color-terracotta)" />
            <span>
              {subtotal >= freeShippingThreshold
                ? "✨ You've unlocked Free Shipping!"
                : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
            </span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'var(--color-stone-light)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: 'var(--color-terracotta)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Content */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {checkoutComplete ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={54} color="var(--color-terracotta)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Order Placed Successfully!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Thank you for supporting small-batch handmade concrete art. We are pouring your order with love.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
              <ShoppingBag size={48} color="var(--color-stone)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>Your shopping bag is empty.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Explore our handmade concrete jars, trays, and vessels.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedFinish}-${idx}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.2rem',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  {/* Thumbnail Image Placeholder */}
                  <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                    <ImagePlaceholder label="Cart Item" dimensions="80x80" />
                  </div>

                  {/* Details */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '1rem' }}>{item.product.title}</h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedFinish)}
                        style={{ color: 'var(--color-text-light)', padding: '0.2rem' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                      Finish: {item.selectedFinish}
                    </span>

                    {item.isB2BBulk && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                        ★ B2B Wholesale Rate Applied
                      </span>
                    )}

                    {item.customNotes && (
                      <span style={{ fontSize: '0.72rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        Note: "{item.customNotes}"
                      </span>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedFinish, item.quantity - 1)}
                          style={{ padding: '0.2rem 0.6rem', fontSize: '0.9rem' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedFinish, item.quantity + 1)}
                          style={{ padding: '0.2rem 0.6rem', fontSize: '0.9rem' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!checkoutComplete && cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-terracotta"
              style={{ width: '100%', padding: '0.9rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
