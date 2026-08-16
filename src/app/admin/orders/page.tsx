"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Layers,
  Ban,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Edit,
  X,
  Printer,
  ChevronRight,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Inspector Modal
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status updating state
  const [newStatus, setNewStatus] = useState<string>("CONFIRMED");
  const [carrier, setCarrier] = useState<string>("Artisan Courier Direct");
  const [milestoneNote, setMilestoneNote] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/orders?status=${statusFilter}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setOrders(json.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const openInspector = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setCarrier(order.carrier || "Artisan Courier Direct");
    setMilestoneNote("");
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setUpdating(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(selectedOrder.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          carrier,
          milestoneDescription: milestoneNote || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update order status");
      }

      setStatusMessage(`Tracking status updated to "${newStatus}"! Milestones synchronized.`);
      fetchOrders();
      // Update selected order view
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        carrier,
      });
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const trackingStages = [
    { key: "CONFIRMED", label: "1. Confirmed", icon: Clock, color: "#F59E0B" },
    { key: "CASTING", label: "2. Casting & Curing", icon: Layers, color: "#6366F1" },
    { key: "PACKING", label: "3. Sanding & Packing", icon: Package, color: "#D97706" },
    { key: "DISPATCHED", label: "4. Dispatched", icon: Truck, color: "#2563EB" },
    { key: "DELIVERED", label: "5. Delivered", icon: CheckCircle2, color: "#10B981" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* FILTER & SEARCH BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          background: "#FFFFFF",
          padding: "16px 20px",
          borderRadius: "14px",
          border: "1px solid rgba(43,38,34,0.08)",
        }}
      >
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "280px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            <input
              type="text"
              placeholder="Search by #NAS-ID, Customer, Email, City..."
              className="form-input"
              style={{ paddingLeft: "36px", fontSize: "0.88rem" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-secondary">
            Search
          </button>
        </form>

        {/* STATUS FILTER BUTTONS */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {["ALL", "CONFIRMED", "CASTING", "PACKING", "DISPATCHED", "DELIVERED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`time-pill ${statusFilter === st ? "active" : ""}`}
              style={{ fontSize: "0.78rem", padding: "6px 12px" }}
            >
              {st === "ALL" ? "All Orders" : st}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order / Tracking ID</th>
                <th>Date Placed</th>
                <th>Customer & Address</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Tracking Status (5 Stages)</th>
                <th style={{ textAlign: "right" }}>Inspect & Track</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    Loading studio order list...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <div>
                        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.92rem", color: "var(--clay)" }}>
                          {ord.id}
                        </span>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>
                          {ord.carrier}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: "0.85rem" }}>{ord.createdAt}</span>
                    </td>

                    <td>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{ord.customerName}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>{ord.customerEmail}</div>
                        {ord.shippingAddress?.city && (
                          <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)", marginTop: "2px" }}>
                            {ord.shippingAddress.city}, {ord.shippingAddress.country}
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: "0.82rem" }}>
                        {ord.items && ord.items.length > 0 ? (
                          <span>
                            {ord.items.map((it: any) => `${it.quantity}x ${it.product?.name || 'Piece'}`).join(", ")}
                          </span>
                        ) : (
                          "Handcrafted Piece"
                        )}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>
                        ${ord.total.toFixed(2)}
                      </div>
                      {ord.promoCode && (
                        <span style={{ fontSize: "0.7rem", color: "var(--sage-deep)", background: "var(--sage-tint)", padding: "1px 5px", borderRadius: "4px" }}>
                          {ord.promoCode}
                        </span>
                      )}
                    </td>

                    <td>
                      <span className={`status-pill status-${ord.status.toLowerCase()}`}>
                        {ord.status}
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => openInspector(ord)}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                      >
                        <Edit size={13} /> Update Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER INSPECTOR & TRACKING ADVANCER MODAL */}
      {isModalOpen && selectedOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: "850px" }}>
            {/* MODAL HEADER */}
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 700, color: "var(--clay)" }}>
                  {selectedOrder.id}
                </span>
                <span className={`status-pill status-${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  href={`/track?id=${encodeURIComponent(selectedOrder.id)}`}
                  target="_blank"
                  className="admin-btn-outline"
                  style={{ padding: "6px 10px", fontSize: "0.78rem" }}
                >
                  <ExternalLink size={13} /> Live Customer Tracking View
                </Link>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="admin-modal-body">
              {statusMessage && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    background: "var(--sage-tint)",
                    color: "var(--sage-deep)",
                    border: "1px solid var(--sage)",
                  }}
                >
                  {statusMessage}
                </div>
              )}

              {/* 5-STAGE TRACKING ADVANCER */}
              <div style={{ background: "#FCFAF7", padding: "18px", borderRadius: "14px", border: "1px solid rgba(43,38,34,0.08)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBottom: "4px" }}>
                  Studio Tracking Controller (5 Production Stages)
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-soft)", marginBottom: "14px" }}>
                  Select the target tracking status to advance the order milestones for customer tracking.
                </p>

                {/* VISUAL STAGES SELECTOR */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px", marginBottom: "16px" }}>
                  {trackingStages.map((st) => {
                    const isSelected = newStatus === st.key;
                    const IconComp = st.icon;
                    return (
                      <button
                        key={st.key}
                        type="button"
                        onClick={() => setNewStatus(st.key)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "12px 8px",
                          borderRadius: "10px",
                          border: isSelected ? `2px solid ${st.color}` : "1px solid rgba(43,38,34,0.12)",
                          background: isSelected ? "#FFFFFF" : "#F8F5F0",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                        }}
                      >
                        <IconComp size={18} color={st.color} style={{ marginBottom: "6px" }} />
                        <span style={{ fontSize: "0.75rem", fontWeight: isSelected ? 700 : 500, color: "var(--ink)" }}>
                          {st.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* CANCELLED OPTION */}
                  <button
                    type="button"
                    onClick={() => setNewStatus("CANCELLED")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "12px 8px",
                      borderRadius: "10px",
                      border: newStatus === "CANCELLED" ? "2px solid #EF4444" : "1px solid rgba(43,38,34,0.12)",
                      background: newStatus === "CANCELLED" ? "#FEE2E2" : "#F8F5F0",
                      cursor: "pointer",
                    }}
                  >
                    <Ban size={18} color="#EF4444" style={{ marginBottom: "6px" }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: newStatus === "CANCELLED" ? 700 : 500, color: "#991B1B" }}>
                      Cancelled
                    </span>
                  </button>
                </div>

                {/* FORM FOR CARRIER & MILESTONE NOTE */}
                <form onSubmit={handleUpdateStatus} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", alignItems: "end" }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: "0.78rem" }}>Carrier / Courier Service</label>
                    <input
                      type="text"
                      className="form-input"
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      placeholder="e.g. Artisan Courier Direct / BlueDart"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: "0.78rem" }}>Milestone Description Note (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={milestoneNote}
                      onChange={(e) => setMilestoneNote(e.target.value)}
                      placeholder="e.g. Mold demolded, curing in water tank"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updating}
                    className="admin-btn admin-btn-primary"
                    style={{ height: "42px", whiteSpace: "nowrap" }}
                  >
                    {updating ? "Saving..." : "Apply Status Update"}
                  </button>
                </form>
              </div>

              {/* CUSTOMER & SHIPPING INFO */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                {/* RECIPIENT */}
                <div style={{ background: "#FCFAF7", padding: "16px", borderRadius: "12px", border: "1px solid rgba(43,38,34,0.08)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "8px" }}>
                    Customer Contact
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>{selectedOrder.customerName}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginTop: "2px" }}>{selectedOrder.customerEmail}</div>
                  {selectedOrder.customerPhone && (
                    <div style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginTop: "2px" }}>{selectedOrder.customerPhone}</div>
                  )}
                </div>

                {/* DELIVERY ADDRESS */}
                <div style={{ background: "#FCFAF7", padding: "16px", borderRadius: "12px", border: "1px solid rgba(43,38,34,0.08)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "8px" }}>
                    Shipping Destination
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "var(--ink)" }}>
                    {selectedOrder.shippingAddress?.street || "Street address not provided"}<br />
                    {selectedOrder.shippingAddress?.city && `${selectedOrder.shippingAddress.city}, `}
                    {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zipCode}<br />
                    <strong>{selectedOrder.shippingAddress?.country || "United States"}</strong>
                  </div>
                </div>
              </div>

              {/* ORDER ITEMS TABLE */}
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "8px" }}>
                  Ordered Handcrafted Pieces
                </div>
                <div style={{ border: "1px solid rgba(43,38,34,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Item Details</th>
                        <th>Variant</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th style={{ textAlign: "right" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((it: any, idx: number) => (
                          <tr key={idx}>
                            <td>
                              <div style={{ fontWeight: 600 }}>{it.product?.name || "Studio Piece"}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>{it.product?.category}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: "0.82rem", background: "#F4EFEB", padding: "2px 8px", borderRadius: "4px" }}>
                                {it.selectedColor || "Standard"}
                              </span>
                            </td>
                            <td>{it.quantity}</td>
                            <td>${it.product?.priceValue || 0}</td>
                            <td style={{ textAlign: "right", fontWeight: 700 }}>
                              ${((it.product?.priceValue || 0) * it.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", padding: "16px" }}>No items listed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* FINANCIAL TOTALS */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
                  <div style={{ width: "260px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.88rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}>
                      <span>Subtotal:</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--sage-deep)" }}>
                        <span>Discount ({selectedOrder.promoCode}):</span>
                        <span>-${selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}>
                      <span>Shipping Fee:</span>
                      <span>{selectedOrder.shipping === 0 ? "Complimentary" : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.05rem", borderTop: "1px solid rgba(43,38,34,0.12)", paddingTop: "6px" }}>
                      <span>Grand Total:</span>
                      <span style={{ color: "var(--clay)" }}>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="admin-btn admin-btn-secondary"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
