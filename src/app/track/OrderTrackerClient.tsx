"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Truck,
  MapPin,
  Ban,
} from "lucide-react";
import { useOrderStore, Order } from "@/store/useOrderStore";

export function OrderTrackerClient() {
  const searchParams = useSearchParams();
  const { fetchOrderById, getOrderById } = useOrderStore();

  const [inputCode, setInputCode] = useState("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const isNewOrder = searchParams.get("new") === "true";

  // Check URL params on mount
  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId) {
      const cleanId = urlId.startsWith("#") ? urlId : `#${urlId}`;
      setInputCode(cleanId);
      performTrack(cleanId);
    } else {
      // Default to sample order for immediate visual presentation
      performTrack("#NAS-749102");
      setInputCode("#NAS-749102");
    }
  }, [searchParams]);

  const performTrack = async (queryId: string) => {
    setErrorMessage("");
    const formatted = queryId.trim().toUpperCase();

    if (!formatted) {
      setActiveOrder(null);
      return;
    }

    // Check if format matches #NAS-XXXXXX or NAS-XXXXXX or XXXXXX
    const nasRegex = /^(#?NAS-?)?\d{6}$/i;
    if (!nasRegex.test(formatted.replace(/\s/g, ""))) {
      setErrorMessage(
        "Invalid format. Tracking IDs must follow the format #NAS-000000 (e.g. #NAS-749102)."
      );
      setActiveOrder(null);
      return;
    }

    // Normalize to #NAS-XXXXXX
    let normalized = formatted.startsWith("#") ? formatted : `#${formatted}`;
    if (!normalized.startsWith("#NAS-")) {
      const digits = normalized.replace(/\D/g, "");
      normalized = `#NAS-${digits}`;
    }

    // First check locally, then async fetch
    const local = getOrderById(normalized);
    if (local) {
      setActiveOrder(local);
    }

    const fetched = await fetchOrderById(normalized);
    if (fetched) {
      setActiveOrder(fetched);
    } else if (!local) {
      setErrorMessage("No active studio order found for tracking ID " + normalized);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performTrack(inputCode);
  };

  const handleCopyId = () => {
    if (activeOrder && typeof window !== "undefined") {
      navigator.clipboard.writeText(activeOrder.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container tracker-container">
      {/* Post-Checkout Celebration Banner */}
      {isNewOrder && activeOrder && (
        <div className="order-confirmed-banner">
          <div className="confirmed-icon-wrap">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <div className="confirmed-title">Thank You For Your Order!</div>
            <div className="confirmed-desc">
              Your piece has entered the studio schedule. We have assigned tracking ID{" "}
              <strong>{activeOrder.id}</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Tracking Search Card */}
      <div className="tracker-search-card">
        <form onSubmit={handleSearchSubmit} className="tracker-search-form">
          <div className="tracker-input-group">
            <Search size={20} className="tracker-search-icon" />
            <input
              type="text"
              placeholder="Enter Tracking ID: #NAS-000000"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="tracker-input"
            />
            <button type="submit" className="btn btn-clay tracker-submit-btn">
              Track Order
            </button>
          </div>
        </form>

        {/* Quick Sample Tracking Buttons */}
        <div className="tracker-samples-bar">
          <span className="samples-label">Try sample tracking IDs:</span>
          <button
            type="button"
            className="sample-id-pill"
            onClick={() => {
              setInputCode("#NAS-749102");
              performTrack("#NAS-749102");
            }}
          >
            #NAS-749102 (Curing)
          </button>
          <button
            type="button"
            className="sample-id-pill"
            onClick={() => {
              setInputCode("#NAS-382910");
              performTrack("#NAS-382910");
            }}
          >
            #NAS-382910 (Delivered)
          </button>
        </div>

        {errorMessage && (
          <div className="tracker-error-row">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Active Tracking Details */}
      {activeOrder && (
        <div className="tracker-results-layout">
          {/* Top Status Header */}
          <div className="tracker-header-card">
            <div className="tracking-id-block">
              <span className="eyebrow" style={{ marginBottom: "4px" }}>
                Studio Tracking ID
              </span>
              <div className="tracking-id-flex">
                <h2 className="tracking-id-text">{activeOrder.id}</h2>
                <button
                  type="button"
                  className="copy-id-btn"
                  onClick={handleCopyId}
                  title="Copy Tracking ID"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="tracking-created-date">
                Ordered on {activeOrder.createdAt}
              </div>
            </div>

            <div className="tracking-status-badge-wrap">
              <span className="status-label">Current Studio Stage:</span>
              <div className={`status-badge is-${activeOrder.status}`}>
                <span className="status-pulse-dot" />
                <span className="status-badge-text">
                  {activeOrder.status === "confirmed" && "Order Logged"}
                  {activeOrder.status === "casting" && "Hand-Casting & Curing"}
                  {activeOrder.status === "packing" && "Fine Sanding & Studio Packing"}
                  {activeOrder.status === "dispatched" && "In Transit / Dispatched"}
                  {activeOrder.status === "delivered" && "Successfully Delivered"}
                  {activeOrder.status === "cancelled" && "Order Cancelled"}
                </span>
              </div>
            </div>
          </div>

          {activeOrder.status === "cancelled" && (
            <div style={{ backgroundColor: "#FDF4F2", border: "1px solid #F3CEC8", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px", color: "#822D20" }}>
              <Ban size={20} />
              <div>
                <strong>This studio order has been cancelled.</strong>
                <div style={{ fontSize: "0.88rem", marginTop: "2px", opacity: 0.9 }}>
                  Hand-casting and dispatch have been stopped. If you have any inquiries, feel free to reach out to our studio artisans.
                </div>
              </div>
            </div>
          )}

          <div className="tracker-columns-grid">
            {/* Left Column: Timeline Stepper */}
            <div className="tracker-timeline-card">
              <h3 className="timeline-title">Artisan Production Journey</h3>

              <div className="timeline-stepper">
                {activeOrder.trackingMilestones.map((milestone, idx) => {
                  const isCompleted = milestone.completed;
                  return (
                    <div
                      key={idx}
                      className={`timeline-step-item ${
                        isCompleted ? "is-completed" : "is-pending"
                      }`}
                    >
                      <div className="step-indicator">
                        {isCompleted ? (
                          <Check size={14} strokeWidth={3} className="step-check" />
                        ) : (
                          <div className="step-dot" />
                        )}
                        {idx < activeOrder.trackingMilestones.length - 1 && (
                          <div className="step-connector-line" />
                        )}
                      </div>

                      <div className="step-content">
                        <div className="step-header">
                          <h4 className="step-title">{milestone.title}</h4>
                          <span className="step-time">{milestone.timestamp}</span>
                        </div>
                        <p className="step-desc">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Details & Address */}
            <div className="tracker-details-column">
              {/* Delivery Meta Card */}
              <div className="tracker-meta-card">
                <h3 className="card-sub-title">Delivery Details</h3>

                <div className="meta-info-list">
                  <div className="meta-info-row">
                    <Calendar size={18} className="meta-icon" />
                    <div>
                      <div className="meta-key">Estimated Delivery Window</div>
                      <div className="meta-val">{activeOrder.estimatedDelivery}</div>
                    </div>
                  </div>

                  <div className="meta-info-row">
                    <Truck size={18} className="meta-icon" />
                    <div>
                      <div className="meta-key">Courier Service</div>
                      <div className="meta-val">{activeOrder.carrier}</div>
                    </div>
                  </div>

                  <div className="meta-info-row">
                    <MapPin size={18} className="meta-icon" />
                    <div>
                      <div className="meta-key">Destination</div>
                      <div className="meta-val">
                        <strong>{activeOrder.shippingAddress?.fullName}</strong>
                        <div>{activeOrder.shippingAddress?.street}</div>
                        <div>
                          {activeOrder.shippingAddress?.city},{" "}
                          {activeOrder.shippingAddress?.state}{" "}
                          {activeOrder.shippingAddress?.zipCode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div className="tracker-items-card">
                <h3 className="card-sub-title">Items in Package</h3>

                <div className="tracker-items-list">
                  {activeOrder.items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="tracker-item-row">
                      <div
                        className="tracker-item-thumb"
                        style={{ background: item.product.swatch }}
                      >
                        {item.product.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="tracker-thumb-img"
                          />
                        )}
                      </div>
                      <div className="tracker-item-info">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="tracker-item-name"
                        >
                          {item.product.name}
                        </Link>
                        <div className="tracker-item-meta">
                          <span>Qty: {item.quantity}</span>
                          {item.selectedColor && (
                            <span> • {item.selectedColor}</span>
                          )}
                        </div>
                      </div>
                      <div className="tracker-item-price">
                        ${(item.product.priceValue * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tracker-total-bar">
                  <span>Order Total (Incl. Shipping)</span>
                  <strong>${activeOrder.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
