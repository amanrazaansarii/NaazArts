"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  User as UserIcon,
  LogOut,
  ChevronRight,
  ExternalLink,
  Plus,
  Check,
  Sparkles,
  ShoppingBag,
  Ban,
} from "lucide-react";
import { useAuthStore, UserAddress } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateAddress, login } = useAuthStore();
  const { orders, fetchUserOrders, cancelOrder } = useOrderStore();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "account">(
    "orders"
  );
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  // Address edit state
  const [street, setStreet] = useState(user?.defaultAddress?.street || "");
  const [city, setCity] = useState(user?.defaultAddress?.city || "");
  const [stateProv, setStateProv] = useState(user?.defaultAddress?.state || "");
  const [zipCode, setZipCode] = useState(user?.defaultAddress?.zipCode || "");
  const [phone, setPhone] = useState(user?.defaultAddress?.phone || "");

  // Load user orders from backend on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserOrders();
    }
  }, [isAuthenticated, fetchUserOrders]);

  useEffect(() => {
    if (user?.defaultAddress) {
      setStreet(user.defaultAddress.street || "");
      setCity(user.defaultAddress.city || "");
      setStateProv(user.defaultAddress.state || "");
      setZipCode(user.defaultAddress.zipCode || "");
      setPhone(user.defaultAddress.phone || "");
    }
  }, [user]);

  // If not logged in, show elegant login prompt
  if (!isAuthenticated || !user) {
    return (
      <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
        <div className="auth-card" style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div className="auth-avatar-icon">
            <UserIcon size={36} />
          </div>
          <h2>Sign In to View Your Profile</h2>
          <p className="body-text" style={{ margin: "12px auto 24px", maxWidth: "380px" }}>
            Access your order history, live #NAS-XXXXXX tracking timelines, and saved studio addresses.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/login" className="btn btn-clay">
              Sign In to Account
            </Link>
            <button
              type="button"
              className="btn btn-outline"
              onClick={async () => {
                await login("patron@naazarts.com", "StudioPatron2026!");
              }}
            >
              <Sparkles size={16} />
              <span>One-Click Demo Sign In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAddress = {
      fullName: user.name,
      street,
      city,
      state: stateProv,
      zipCode,
      country: "United States",
      phone,
    };
    await updateAddress(updated);
    setIsEditingAddress(false);
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 2500);
  };

  const handleConfirmCancel = async (orderId: string) => {
    const res = await cancelOrder(orderId);
    if (res.success) {
      setCancelFeedback(`Order ${orderId} has been cancelled.`);
      setCancelModalId(null);
      setTimeout(() => setCancelFeedback(null), 3000);
    } else {
      setCancelFeedback(res.error || "Failed to cancel order.");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="profile-page-wrapper">
      <div className="container profile-container">
        {/* User Hero Banner */}
        <div className="profile-hero-card">
          <div className="profile-user-left">
            <div className="profile-avatar-bubble">
              {user.avatarText || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="profile-user-badge">Studio Patron</div>
              <h1 className="profile-user-name">{user.name}</h1>
              <div className="profile-user-email">{user.email}</div>
            </div>
          </div>

          <div className="profile-hero-actions">
            <button
              type="button"
              className="btn btn-outline profile-logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {cancelFeedback && (
          <div className="address-saved-banner" style={{ marginBottom: "20px" }}>
            <Check size={16} />
            <span>{cancelFeedback}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="profile-tabs-nav">
          <button
            type="button"
            className={`profile-tab-item ${activeTab === "orders" ? "is-active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <Package size={18} />
            <span>Order History ({orders.length})</span>
          </button>
          <button
            type="button"
            className={`profile-tab-item ${activeTab === "addresses" ? "is-active" : ""}`}
            onClick={() => setActiveTab("addresses")}
          >
            <MapPin size={18} />
            <span>Delivery Addresses</span>
          </button>
          <button
            type="button"
            className={`profile-tab-item ${activeTab === "account" ? "is-active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <UserIcon size={18} />
            <span>Account Details</span>
          </button>
        </div>

        {/* Tab 1: Order History */}
        {activeTab === "orders" && (
          <div className="profile-tab-content">
            {orders.length === 0 ? (
              <div className="profile-empty-card">
                <ShoppingBag size={36} strokeWidth={1.5} />
                <h3>No Orders Placed Yet</h3>
                <p className="body-text" style={{ margin: "8px auto 20px" }}>
                  Your hand-cast concrete orders will appear here along with live #NAS-XXXXXX tracking timelines.
                </p>
                <Link href="/shop" className="btn btn-clay">
                  Explore Studio Collection
                </Link>
              </div>
            ) : (
              <div className="profile-orders-list">
                {orders.map((order) => {
                  const canCancel = order.status === "confirmed" || order.status === "casting";
                  return (
                    <div key={order.id} className="profile-order-card">
                      <div className="order-card-header">
                        <div>
                          <div className="order-id-line">
                            <span className="order-id-label">Tracking ID:</span>
                            <Link
                              href={`/track?id=${encodeURIComponent(order.id)}`}
                              className="order-id-link"
                            >
                              <strong>{order.id}</strong>
                              <ExternalLink size={14} />
                            </Link>
                          </div>
                          <div className="order-date-text">
                            Placed on {order.createdAt}
                          </div>
                        </div>

                        <div className="order-status-and-total">
                          <div className={`status-badge is-${order.status}`}>
                            <span className="status-pulse-dot" />
                            <span>
                              {order.status === "confirmed" && "Order Logged"}
                              {order.status === "casting" && "Hand-Casting & Curing"}
                              {order.status === "packing" && "Studio Packing"}
                              {order.status === "dispatched" && "In Transit"}
                              {order.status === "delivered" && "Delivered"}
                              {order.status === "cancelled" && "Cancelled"}
                            </span>
                          </div>
                          <div className="order-card-total">
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="order-card-items-row">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-preview-chip">
                            <div
                              className="preview-chip-swatch"
                              style={{ background: item.product.swatch }}
                            >
                              {item.product.image && (
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="preview-chip-img"
                                />
                              )}
                            </div>
                            <span className="preview-chip-title">
                              {item.quantity}x {item.product.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-actions" style={{ display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center" }}>
                        {canCancel && (
                          <button
                            type="button"
                            className="btn btn-outline"
                            style={{ padding: "8px 14px", fontSize: "0.85rem", color: "#8E4438", borderColor: "#E5C8C3" }}
                            onClick={() => setCancelModalId(order.id)}
                          >
                            <Ban size={14} />
                            <span>Cancel Order</span>
                          </button>
                        )}
                        <Link
                          href={`/track?id=${encodeURIComponent(order.id)}`}
                          className="btn btn-clay track-journey-btn"
                        >
                          <span>Track Studio Journey</span>
                          <ChevronRight size={16} />
                        </Link>
                      </div>

                      {cancelModalId === order.id && (
                        <div style={{ marginTop: "16px", padding: "14px", backgroundColor: "#FDF8F7", borderRadius: "8px", border: "1px solid #F5D6D0" }}>
                          <p style={{ margin: "0 0 10px", fontSize: "0.9rem", color: "#662B22" }}>
                            Are you sure you want to cancel order <strong>{order.id}</strong>? Hand-casting will be halted.
                          </p>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              type="button"
                              className="btn btn-clay"
                              style={{ padding: "6px 14px", fontSize: "0.82rem", backgroundColor: "#8E4438" }}
                              onClick={() => handleConfirmCancel(order.id)}
                            >
                              Yes, Cancel Order
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline"
                              style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                              onClick={() => setCancelModalId(null)}
                            >
                              Keep Order
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Delivery Addresses */}
        {activeTab === "addresses" && (
          <div className="profile-tab-content">
            <div className="address-management-grid">
              <div className="address-card">
                <div className="address-card-header">
                  <div className="address-type-tag">Primary Destination</div>
                  <button
                    type="button"
                    className="address-edit-btn"
                    onClick={() => setIsEditingAddress((prev) => !prev)}
                  >
                    {isEditingAddress ? "Cancel" : "Edit Address"}
                  </button>
                </div>

                {!isEditingAddress ? (
                  <div className="address-body-view">
                    <div className="address-name">{user.name}</div>
                    <div className="address-line">
                      {user.defaultAddress?.street || "No street address saved"}
                    </div>
                    <div className="address-line">
                      {user.defaultAddress?.city && user.defaultAddress?.state
                        ? `${user.defaultAddress.city}, ${user.defaultAddress.state} ${user.defaultAddress.zipCode}`
                        : "City, State ZIP"}
                    </div>
                    <div className="address-line">
                      {user.defaultAddress?.country || "United States"}
                    </div>
                    {user.defaultAddress?.phone && (
                      <div className="address-phone">
                        Phone: {user.defaultAddress.phone}
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSaveAddress} className="address-edit-form">
                    <div className="form-field-group">
                      <label className="field-label">Street Address</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="123 Artisan Way"
                        className="profile-input"
                        required
                      />
                    </div>
                    <div className="checkout-fields-grid">
                      <div className="form-field-group">
                        <label className="field-label">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="profile-input"
                          required
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">State</label>
                        <input
                          type="text"
                          value={stateProv}
                          onChange={(e) => setStateProv(e.target.value)}
                          placeholder="State"
                          className="profile-input"
                          required
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">ZIP Code</label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="ZIP Code"
                          className="profile-input"
                          required
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="profile-input"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-clay" style={{ marginTop: "12px" }}>
                      Save Address
                    </button>
                  </form>
                )}

                {addressSaved && (
                  <div className="address-saved-banner">
                    <Check size={16} />
                    <span>Default delivery address updated!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Account Details */}
        {activeTab === "account" && (
          <div className="profile-tab-content">
            <div className="account-details-card">
              <h3 className="card-sub-title">Patron Account Settings</h3>

              <div className="account-info-rows">
                <div className="account-info-row">
                  <span className="info-key">Full Name</span>
                  <span className="info-val">{user.name}</span>
                </div>
                <div className="account-info-row">
                  <span className="info-key">Email Address</span>
                  <span className="info-val">{user.email}</span>
                </div>
                <div className="account-info-row">
                  <span className="info-key">Member Status</span>
                  <span className="info-val">Active Studio Patron (Since {user.memberSince})</span>
                </div>
                <div className="account-info-row">
                  <span className="info-key">Studio Drop Alerts</span>
                  <span className="info-val">Subscribed (Email)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
