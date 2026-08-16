"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowLeft,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore, UserAddress } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getGrandTotal,
    discountPercent,
    promoCode,
    clearCart,
  } = useCartStore();

  const { isAuthenticated, user } = useAuthStore();
  const createOrder = useOrderStore((state) => state.createOrder);

  // Form State
  const [email, setEmail] = useState(user?.email || "");
  const [fullName, setFullName] = useState(
    user?.defaultAddress?.fullName || user?.name || ""
  );
  const [street, setStreet] = useState(user?.defaultAddress?.street || "");
  const [city, setCity] = useState(user?.defaultAddress?.city || "");
  const [stateProv, setStateProv] = useState(user?.defaultAddress?.state || "");
  const [zipCode, setZipCode] = useState(user?.defaultAddress?.zipCode || "");
  const [country, setCountry] = useState(
    user?.defaultAddress?.country || "United States"
  );
  const [phone, setPhone] = useState(user?.defaultAddress?.phone || "");

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );

  // Payment Method
  const [paymentType, setPaymentType] = useState<"card" | "upi" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [upiId, setUpiId] = useState("");

  // Processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const baseShipping = getShippingCost();
  const finalShipping =
    shippingMethod === "express" ? baseShipping + 12 : baseShipping;
  const grandTotal = Math.max(0, subtotal - discount + finalShipping);

  // Redirect if cart is empty
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Your bag is empty</h2>
        <p className="body-text" style={{ margin: "14px 0 28px" }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn btn-clay">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !fullName || !street || !city || !stateProv || !zipCode) {
      setFormError("Please fill out all required contact and delivery fields.");
      return;
    }

    if (paymentType === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      setFormError("Please complete your card details.");
      return;
    }

    if (paymentType === "upi" && !upiId) {
      setFormError("Please enter your UPI / Wallet ID.");
      return;
    }

    setIsSubmitting(true);

    const shippingAddress: UserAddress = {
      fullName,
      street,
      city,
      state: stateProv,
      zipCode,
      country,
      phone,
    };

    try {
      const order = await createOrder({
        email,
        items: [...items],
        shippingAddress,
        shippingMethod,
        paymentType,
        promoCode: promoCode || null,
      });

      clearCart();
      router.push(`/track?id=${encodeURIComponent(order.id)}&new=true`);
    } catch (err: any) {
      setIsSubmitting(false);
      setFormError(err?.message || "Failed to process studio order. Please try again.");
    }
  };

  return (
    <div className="checkout-page-root">
      <div className="container checkout-container">
        {/* Navigation Breadcrumb */}
        <div className="checkout-top-bar">
          <Link href="/cart" className="checkout-back-link">
            <ArrowLeft size={16} />
            <span>Back to Bag</span>
          </Link>
          <div className="checkout-secure-badge">
            <Lock size={14} />
            <span>256-Bit SSL Encrypted Studio Checkout</span>
          </div>
        </div>

        <div className="checkout-grid-layout">
          {/* Left Column: Multi-Step Forms */}
          <div className="checkout-form-column">
            <form onSubmit={handleSubmitOrder} className="checkout-main-form">
              {/* Step 1: Contact Information */}
              <div className="checkout-section-card">
                <div className="section-card-header">
                  <div className="step-num">1</div>
                  <h3>Contact Information</h3>
                  {!isAuthenticated && (
                    <Link href="/login" className="login-hint-link">
                      Already have an account? Sign in
                    </Link>
                  )}
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="checkout-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="patron@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="checkout-input"
                  />
                  <span className="field-helper">
                    Your studio tracking ID (#NAS-XXXXXX) will be sent here.
                  </span>
                </div>
              </div>

              {/* Step 2: Shipping Details */}
              <div className="checkout-section-card">
                <div className="section-card-header">
                  <div className="step-num">2</div>
                  <h3>Shipping Address</h3>
                </div>

                <div className="checkout-fields-grid">
                  <div className="form-field-group col-span-2">
                    <label className="field-label" htmlFor="checkout-name">
                      Full Recipient Name <span className="req">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-field-group col-span-2">
                    <label className="field-label" htmlFor="checkout-street">
                      Street Address <span className="req">*</span>
                    </label>
                    <input
                      id="checkout-street"
                      type="text"
                      required
                      placeholder="Street name, house/apartment number"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="checkout-city">
                      City <span className="req">*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="checkout-state">
                      State / Province <span className="req">*</span>
                    </label>
                    <input
                      id="checkout-state"
                      type="text"
                      required
                      placeholder="State or Region"
                      value={stateProv}
                      onChange={(e) => setStateProv(e.target.value)}
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="checkout-zip">
                      ZIP / Postal Code <span className="req">*</span>
                    </label>
                    <input
                      id="checkout-zip"
                      type="text"
                      required
                      placeholder="Postal code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="checkout-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="checkout-phone">
                      Phone Number (for courier)
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="checkout-input"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="checkout-section-card">
                <div className="section-card-header">
                  <div className="step-num">3</div>
                  <h3>Delivery Method</h3>
                </div>

                <div className="shipping-options-list">
                  <label
                    className={`shipping-option-card ${
                      shippingMethod === "standard" ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="option-radio"
                    />
                    <div className="option-content">
                      <div className="option-title-row">
                        <span className="option-name">Standard Studio Dispatch</span>
                        <span className="option-price">
                          {baseShipping === 0 ? "FREE" : `$${baseShipping.toFixed(2)}`}
                        </span>
                      </div>
                      <span className="option-desc">
                        Cured, sealed, and delivered in 5-7 business days with plastic-free packaging.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`shipping-option-card ${
                      shippingMethod === "express" ? "is-selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="option-radio"
                    />
                    <div className="option-content">
                      <div className="option-title-row">
                        <span className="option-name">Priority Express Studio Dispatch</span>
                        <span className="option-price">
                          +${(baseShipping + 12).toFixed(2)}
                        </span>
                      </div>
                      <span className="option-desc">
                        Expedited mold priority & fast-tracked courier (2-3 business days).
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Simulation */}
              <div className="checkout-section-card">
                <div className="section-card-header">
                  <div className="step-num">4</div>
                  <h3>Payment Simulation</h3>
                </div>

                <div className="payment-tabs-bar">
                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentType === "card" ? "active" : ""}`}
                    onClick={() => setPaymentType("card")}
                  >
                    <CreditCard size={16} />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentType === "upi" ? "active" : ""}`}
                    onClick={() => setPaymentType("upi")}
                  >
                    <Sparkles size={16} />
                    <span>UPI / GPay / Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentType === "cod" ? "active" : ""}`}
                    onClick={() => setPaymentType("cod")}
                  >
                    <Truck size={16} />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentType === "card" && (
                  <div className="payment-body-box">
                    <div className="form-field-group">
                      <label className="field-label">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="checkout-input"
                        maxLength={19}
                      />
                    </div>
                    <div className="checkout-fields-grid" style={{ marginTop: "12px" }}>
                      <div className="form-field-group">
                        <label className="field-label">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="checkout-input"
                          maxLength={5}
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">CVC / CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="checkout-input"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentType === "upi" && (
                  <div className="payment-body-box">
                    <div className="form-field-group">
                      <label className="field-label">UPI ID / Mobile Number</label>
                      <input
                        type="text"
                        placeholder="username@okhdfcbank or 9876543210"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="checkout-input"
                      />
                      <span className="field-helper">
                        A payment prompt simulation will be triggered.
                      </span>
                    </div>
                  </div>
                )}

                {paymentType === "cod" && (
                  <div className="payment-body-box">
                    <p className="body-text" style={{ fontSize: "0.88rem" }}>
                      Pay with cash or digital UPI upon doorstep delivery. Our courier will handle fragile parcel verification with you.
                    </p>
                  </div>
                )}
              </div>

              {formError && (
                <div className="checkout-error-banner">{formError}</div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-clay checkout-submit-btn ${
                  isSubmitting ? "is-loading" : ""
                }`}
              >
                {isSubmitting ? (
                  <span>Generating Studio Order & Tracking ID...</span>
                ) : (
                  <span>Complete Order • ${grandTotal.toFixed(2)}</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="checkout-summary-column">
            <div className="checkout-summary-sticky">
              <h3 className="summary-title">Order Items ({items.length})</h3>

              <div className="checkout-items-mini-list">
                {items.map((item) => (
                  <div key={item.id} className="checkout-mini-item">
                    <div
                      className="mini-item-thumb"
                      style={{ background: item.product.swatch }}
                    >
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="mini-thumb-img"
                        />
                      )}
                      <span className="mini-qty-badge">{item.quantity}</span>
                    </div>
                    <div className="mini-item-details">
                      <div className="mini-item-name">{item.product.name}</div>
                      <div className="mini-item-cat">
                        {item.product.category}
                        {item.selectedColor ? ` • ${item.selectedColor}` : ""}
                      </div>
                    </div>
                    <div className="mini-item-price">
                      ${(item.product.priceValue * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-lines" style={{ marginTop: "20px" }}>
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-val">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="summary-label">
                      Promo Discount ({discountPercent}%)
                    </span>
                    <span className="summary-val">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-val">
                    {finalShipping === 0 ? (
                      <span className="free-tag">Free</span>
                    ) : (
                      `$${finalShipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="summary-divider" />

                <div className="summary-row grand-total-row">
                  <span className="summary-label">Total to Pay</span>
                  <span className="summary-val">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="checkout-guarantee-box">
                <div className="guarantee-row">
                  <CheckCircle2 size={16} className="guarantee-icon" />
                  <span>Auto-generates unique <strong>#NAS-XXXXXX</strong> tracking</span>
                </div>
                <div className="guarantee-row">
                  <ShieldCheck size={16} className="guarantee-icon" />
                  <span>Artisan breakage replacement warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
