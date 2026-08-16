"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    promoCode,
    discountPercent,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getGrandTotal,
    getTotalItems,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{
    success: boolean;
    text: string;
  } | null>(null);
  const [giftNote, setGiftNote] = useState("");
  const [showGiftNote, setShowGiftNote] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const grandTotal = getGrandTotal();
  const totalItems = getTotalItems();

  const freeShippingThreshold = 60;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyPromoCode(couponInput);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput("");
    }
  };

  return (
    <div className="cart-page-wrapper">
      <header className="page-header" style={{ paddingBottom: "24px" }}>
        <div className="container">
          <span className="eyebrow">Your Bag</span>
          <h1>Shopping Cart ({totalItems})</h1>
        </div>
      </header>

      <div className="container cart-content-container">
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <div className="empty-cart-icon-wrap">
              <ShoppingBag size={38} strokeWidth={1.5} />
            </div>
            <h2>Your bag is currently empty</h2>
            <p className="body-text" style={{ maxWidth: "420px", margin: "10px auto 28px" }}>
              Explore our handmade concrete trays, sculptural vases, and DIY kits to start filling your home with functional art.
            </p>
            <div className="empty-cart-actions">
              <Link href="/shop" className="btn btn-clay">
                Explore The Collection
              </Link>
              <Link href="/workshops" className="btn btn-outline">
                Book a Workshop
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-grid-layout">
            {/* Left Column: Cart Items List */}
            <div className="cart-items-column">
              {/* Free Shipping Progress Indicator */}
              <div className="free-shipping-card">
                <div className="free-shipping-header">
                  <Truck size={18} className="free-shipping-icon" />
                  <span>
                    {remainingForFreeShipping > 0 ? (
                      <>
                        Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free Studio Shipping</strong>
                      </>
                    ) : (
                      <strong>🎉 You&apos;ve unlocked Free Studio Shipping!</strong>
                    )}
                  </span>
                </div>
                <div className="shipping-progress-track">
                  <div
                    className="shipping-progress-bar"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="cart-items-list">
                {items.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div
                      className="cart-item-thumb"
                      style={{ background: item.product.swatch }}
                    >
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="cart-thumb-img"
                        />
                      ) : (
                        <div className="cart-thumb-fallback">
                          {item.product.name.slice(0, 2)}
                        </div>
                      )}
                    </div>

                    <div className="cart-item-main">
                      <div className="cart-item-top">
                        <div>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            className="cart-item-name"
                          >
                            {item.product.name}
                          </Link>
                          <div className="cart-item-meta">
                            <span>{item.product.category}</span>
                            {item.selectedColor && (
                              <span className="cart-color-pill">
                                • {item.selectedColor}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="cart-item-price-unit">
                          {item.product.price}
                        </div>
                      </div>

                      <div className="cart-item-bottom">
                        {/* Quantity Counter */}
                        <div className="cart-qty-counter">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item Total & Remove */}
                        <div className="cart-item-actions">
                          <span className="cart-item-total">
                            ${(item.product.priceValue * item.quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            className="cart-remove-btn"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Note Accordion */}
              <div className="gift-note-card">
                <button
                  type="button"
                  className="gift-note-toggle"
                  onClick={() => setShowGiftNote((prev) => !prev)}
                >
                  <Sparkles size={16} />
                  <span>
                    {showGiftNote
                      ? "Hide Artisan Gift Note"
                      : "Add a complimentary handwritten note"}
                  </span>
                </button>
                {showGiftNote && (
                  <div className="gift-note-input-wrap">
                    <textarea
                      placeholder="Write your personal message here. We will handwrite it on studio seeded wildflower paper..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={3}
                      className="gift-note-textarea"
                    />
                  </div>
                )}
              </div>

              <div className="cart-table-footer">
                <Link href="/shop" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
                <button
                  type="button"
                  className="clear-cart-link"
                  onClick={clearCart}
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="cart-summary-column">
              <div className="cart-summary-card">
                <h3 className="summary-title">Order Summary</h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="summary-coupon-form">
                  <div className="coupon-input-group">
                    <Tag size={16} className="coupon-icon" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. DECOR10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="coupon-input"
                    />
                    <button type="submit" className="coupon-apply-btn">
                      Apply
                    </button>
                  </div>

                  {couponMsg && (
                    <div
                      className={`coupon-status-msg ${
                        couponMsg.success ? "is-success" : "is-error"
                      }`}
                    >
                      {couponMsg.success ? <Check size={14} /> : <X size={14} />}
                      <span>{couponMsg.text}</span>
                    </div>
                  )}

                  {promoCode && (
                    <div className="applied-coupon-tag">
                      <span>Code: <strong>{promoCode}</strong> ({discountPercent}% off)</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="remove-coupon-btn"
                        aria-label="Remove promo code"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </form>

                {/* Cost Breakdown */}
                <div className="summary-lines">
                  <div className="summary-row">
                    <span className="summary-label">Subtotal</span>
                    <span className="summary-val">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="summary-row discount-row">
                      <span className="summary-label">
                        Discount ({discountPercent}%)
                      </span>
                      <span className="summary-val">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span className="summary-label">Studio Shipping</span>
                    <span className="summary-val">
                      {shipping === 0 ? (
                        <span className="free-tag">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-row grand-total-row">
                    <span className="summary-label">Estimated Total</span>
                    <span className="summary-val">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-clay checkout-cta-btn"
                  onClick={() => router.push("/checkout")}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={17} />
                </button>

                {/* Studio Trust Badges */}
                <div className="summary-trust-list">
                  <div className="summary-trust-item">
                    <ShieldCheck size={16} className="trust-icon" />
                    <span>Safe transit guarantee on all concrete art</span>
                  </div>
                  <div className="summary-trust-item">
                    <Truck size={16} className="trust-icon" />
                    <span>Dispatch tracking ID generated on order</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
