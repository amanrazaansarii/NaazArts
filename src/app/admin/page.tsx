"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  Truck,
  CheckCircle,
  Clock,
  Ban,
  Calendar,
  ArrowUpRight,
  Filter,
  DollarSign,
  Boxes,
  Eye,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<string>("month");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/analytics?period=${period}`;
      if (period === "custom" && customStart) {
        url += `&startDate=${customStart}`;
        if (customEnd) url += `&endDate=${customEnd}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const handleApplyCustomDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (customStart) {
      fetchAnalytics();
    }
  };

  const formatPrice = (usdAmount: number) => {
    if (currency === "INR") {
      return `₹${Math.round(usdAmount * 82).toLocaleString()}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* TIME FILTER & CONTROLS HEADER */}
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
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "4px" }}>
            Studio Performance & Live Pipeline
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
            Real-time tracking of sales, handmade product status, and dispatch workflow.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          {/* CURRENCY TOGGLE */}
          <div style={{ display: "flex", background: "#F4EFEB", borderRadius: "8px", padding: "3px" }}>
            <button
              onClick={() => setCurrency("USD")}
              style={{
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                background: currency === "USD" ? "var(--clay)" : "transparent",
                color: currency === "USD" ? "#FFF" : "var(--ink-soft)",
              }}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("INR")}
              style={{
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                background: currency === "INR" ? "var(--clay)" : "transparent",
                color: currency === "INR" ? "#FFF" : "var(--ink-soft)",
              }}
            >
              INR (₹)
            </button>
          </div>

          {/* TIME PERIOD SELECTOR */}
          <div className="time-filter-bar">
            <button
              onClick={() => setPeriod("today")}
              className={`time-pill ${period === "today" ? "active" : ""}`}
            >
              Today
            </button>
            <button
              onClick={() => setPeriod("week")}
              className={`time-pill ${period === "week" ? "active" : ""}`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={`time-pill ${period === "month" ? "active" : ""}`}
            >
              This Month
            </button>
            <button
              onClick={() => setPeriod("year")}
              className={`time-pill ${period === "year" ? "active" : ""}`}
            >
              This Year
            </button>
            <button
              onClick={() => setPeriod("custom")}
              className={`time-pill ${period === "custom" ? "active" : ""}`}
            >
              Custom Range
            </button>
          </div>

          <button
            onClick={fetchAnalytics}
            title="Refresh statistics"
            className="admin-btn-secondary"
            style={{ padding: "8px 12px" }}
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* CUSTOM DATE RANGE PICKER (IF SELECTED) */}
      {period === "custom" && (
        <form
          onSubmit={handleApplyCustomDate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#FFF",
            padding: "12px 18px",
            borderRadius: "10px",
            border: "1px solid var(--clay)",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Filter by custom dates:</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>From:</label>
            <input
              type="date"
              className="form-input"
              style={{ padding: "6px 10px", width: "auto" }}
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>To:</label>
            <input
              type="date"
              className="form-input"
              style={{ padding: "6px 10px", width: "auto" }}
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: "6px 14px" }}>
            Apply Filter
          </button>
        </form>
      )}

      {/* KEY METRICS OVERVIEW */}
      <div className="admin-grid-kpis">
        <div className="kpi-card">
          <span className="kpi-label">Total Period Revenue</span>
          <div className="kpi-value">{data ? formatPrice(data.summary.totalRevenue) : "..."}</div>
          <div className="kpi-sub">
            Filtered for <strong>{period === "month" ? "current month" : period}</strong>
          </div>
        </div>

        <div className="kpi-card sage">
          <span className="kpi-label">Total Orders Placed</span>
          <div className="kpi-value">{data ? data.summary.totalOrders : "..."}</div>
          <div className="kpi-sub">
            Avg order value: <strong>{data ? formatPrice(data.summary.averageOrderValue) : "..."}</strong>
          </div>
        </div>

        <div className="kpi-card stone">
          <span className="kpi-label">Active in Studio Pipeline</span>
          <div className="kpi-value">{data ? data.pipelineSummary.activeInStudio : "..."}</div>
          <div className="kpi-sub">
            Currently in mold casting, curing or packing
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Catalog & Inquiries</span>
          <div className="kpi-value">{data ? `${data.summary.totalProductsCount} Pieces` : "..."}</div>
          <div className="kpi-sub">
            <strong>{data ? data.summary.activeInquiriesCount : 0}</strong> new customer queries
          </div>
        </div>
      </div>

      {/* 5-STAGE PRODUCTION & TRACKING PIPELINE STATUS */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: "2px" }}>
              Crafting & Order Tracking Pipeline (All 5 Statuses)
            </h2>
            <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}>
              Real-time monitoring of how many handcrafted pieces are in each stage of production and dispatch.
            </p>
          </div>
          <Link href="/admin/orders" className="admin-btn admin-btn-outline" style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
            Manage Tracking →
          </Link>
        </div>

        <div className="admin-pipeline-grid">
          {/* 1. CONFIRMED */}
          <div className="pipeline-stage-card" style={{ borderLeft: "4px solid #F59E0B" }}>
            <div className="pipeline-stage-title">
              <span>1. Confirmed / Queued</span>
              <Clock size={16} color="#F59E0B" />
            </div>
            <div className="pipeline-stage-count">{data ? data.statusCounts.CONFIRMED : 0}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Orders verified, queued for casting</span>
          </div>

          {/* 2. CASTING */}
          <div className="pipeline-stage-card" style={{ borderLeft: "4px solid #6366F1" }}>
            <div className="pipeline-stage-title">
              <span>2. Currently Crafted / Casting</span>
              <Layers size={16} color="#6366F1" />
            </div>
            <div className="pipeline-stage-count">{data ? data.statusCounts.CASTING : 0}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Pigment poured, 48h water curing</span>
          </div>

          {/* 3. PACKING */}
          <div className="pipeline-stage-card" style={{ borderLeft: "4px solid #D97706" }}>
            <div className="pipeline-stage-title">
              <span>3. Fine Sanding & Packing</span>
              <Package size={16} color="#D97706" />
            </div>
            <div className="pipeline-stage-count">{data ? data.statusCounts.PACKING : 0}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Organic wax sealing & boxing</span>
          </div>

          {/* 4. DISPATCHED */}
          <div className="pipeline-stage-card" style={{ borderLeft: "4px solid #2563EB" }}>
            <div className="pipeline-stage-title">
              <span>4. Dispatched / Shipped</span>
              <Truck size={16} color="#2563EB" />
            </div>
            <div className="pipeline-stage-count">{data ? data.statusCounts.DISPATCHED : 0}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>In transit with active tracking ID</span>
          </div>

          {/* 5. DELIVERED */}
          <div className="pipeline-stage-card" style={{ borderLeft: "4px solid #10B981" }}>
            <div className="pipeline-stage-title">
              <span>5. Delivered / Completed</span>
              <CheckCircle size={16} color="#10B981" />
            </div>
            <div className="pipeline-stage-count">{data ? data.statusCounts.DELIVERED : 0}</div>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-soft)" }}>Safely arrived at destination</span>
          </div>
        </div>
      </div>

      {/* LOWER SPLIT: TOP SELLING PIECES & RECENT ORDERS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
        {/* TOP SELLING PRODUCTS */}
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
              Top Selling Handcrafted Pieces
            </h3>
            <Link href="/admin/products" style={{ fontSize: "0.8rem", color: "var(--clay)", fontWeight: 600 }}>
              View Catalog →
            </Link>
          </div>

          {data && data.topProducts && data.topProducts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.topProducts.map((prod: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#FCFAF7",
                    border: "1px solid rgba(43,38,34,0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "8px",
                          background: "var(--tone-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Package size={18} color="var(--ink-soft)" />
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{prod.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--ink-soft)" }}>
                        {prod.quantity} units ordered
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>
                      {formatPrice(prod.revenue)}
                    </div>
                    <span className="status-pill status-in-stock" style={{ fontSize: "0.68rem" }}>
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "30px 0", textAlign: "center", color: "var(--ink-faint)" }}>
              <Boxes size={32} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
              <p style={{ fontSize: "0.85rem" }}>No product sales recorded in this period</p>
            </div>
          )}
        </div>

        {/* RECENT ORDERS FEED */}
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
              Recent Studio Orders
            </h3>
            <Link href="/admin/orders" style={{ fontSize: "0.8rem", color: "var(--clay)", fontWeight: 600 }}>
              All Orders →
            </Link>
          </div>

          {data && data.recentOrders && data.recentOrders.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {data.recentOrders.map((ord: any) => (
                <div
                  key={ord.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#FCFAF7",
                    border: "1px solid rgba(43,38,34,0.06)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--clay)" }}>
                        {ord.id}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "var(--ink-faint)" }}>
                        {ord.createdAt}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)", marginTop: "2px" }}>
                      {ord.guestEmail || "Direct Studio Patron"}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className={`status-pill status-${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>
                      {formatPrice(ord.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "30px 0", textAlign: "center", color: "var(--ink-faint)" }}>
              <ShoppingBag size={32} style={{ margin: "0 auto 8px", opacity: 0.4 }} />
              <p style={{ fontSize: "0.85rem" }}>No orders placed in this time frame</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
