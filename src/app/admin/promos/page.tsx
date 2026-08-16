"use client";

import { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Trash2,
  Edit,
  Percent,
  Check,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form fields
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [minItems, setMinItems] = useState<number>(1);
  const [firstOrderOnly, setFirstOrderOnly] = useState(false);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/promos");
      if (res.ok) {
        const json = await res.json();
        setPromos(json.promoCodes || []);
      }
    } catch (err) {
      console.error("Failed to fetch promos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentId(null);
    setCode("");
    setDiscountPercent(10);
    setMinItems(1);
    setFirstOrderOnly(false);
    setRequiresAuth(false);
    setIsActive(true);
    setDescription("Studio promotion discount");
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setModalMode("edit");
    setCurrentId(p.id);
    setCode(p.code);
    setDiscountPercent(p.discountPercent);
    setMinItems(p.minItems);
    setFirstOrderOnly(p.firstOrderOnly);
    setRequiresAuth(p.requiresAuth);
    setIsActive(p.isActive);
    setDescription(p.description);
    setIsModalOpen(true);
  };

  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      minItems: Number(minItems),
      firstOrderOnly,
      requiresAuth,
      isActive,
      description,
    };

    try {
      const url = modalMode === "create" ? "/api/admin/promos" : `/api/admin/promos/${currentId}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPromos();
      } else {
        alert("Failed to save promo code");
      }
    } catch {
      alert("Failed to save promo code");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePromo = async (id: string, code: string) => {
    if (!confirm(`Delete promo code "${code}"?`)) return;
    try {
      const res = await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
      if (res.ok) fetchPromos();
    } catch {
      alert("Could not delete promo code");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "2px" }}>
            Promotional Discounts & Coupon Codes
          </h1>
          <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}>
            Configure studio discount codes, minimum item requirements, and first-order patron incentives.
          </p>
        </div>

        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* PROMO CODES LIST */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Percentage</th>
                <th>Conditions</th>
                <th>Description</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    Loading promo codes...
                  </td>
                </tr>
              ) : promos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    No promo codes registered yet.
                  </td>
                </tr>
              ) : (
                promos.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, color: "var(--clay)", background: "var(--clay-tint)", padding: "3px 8px", borderRadius: "6px" }}>
                        {p.code}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, fontSize: "1rem" }}>{p.discountPercent}% OFF</span>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>
                        {p.minItems > 1 && <div>Min {p.minItems} pieces</div>}
                        {p.firstOrderOnly && <div>First order only</div>}
                        {p.requiresAuth && <div>Account required</div>}
                        {!p.firstOrderOnly && p.minItems <= 1 && <div>No minimum</div>}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem" }}>{p.description}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${p.isActive ? "status-in-stock" : "status-unavailable"}`}>
                        {p.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          onClick={() => openEditModal(p)}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: "6px 8px" }}
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => handleDeletePromo(p.id, p.code)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: "6px 8px" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                {modalMode === "create" ? "Create Promo Code" : `Edit: ${code}`}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePromo}>
              <div className="admin-modal-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Coupon Code (Uppercase) *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. STUDIO15"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Discount Percentage (%) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      min={1}
                      max={100}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Minimum Items Required</label>
                    <input
                      type="number"
                      className="form-input"
                      value={minItems}
                      onChange={(e) => setMinItems(Number(e.target.value))}
                      min={1}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description / Helper Note</label>
                    <input
                      type="text"
                      className="form-input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. 10% off for 3+ handmade pieces"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "#FCFAF7", padding: "14px", borderRadius: "10px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
                    <input
                      type="checkbox"
                      checked={firstOrderOnly}
                      onChange={(e) => setFirstOrderOnly(e.target.checked)}
                    />
                    Applies strictly to patron's first order
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
                    <input
                      type="checkbox"
                      checked={requiresAuth}
                      onChange={(e) => setRequiresAuth(e.target.checked)}
                    />
                    Requires logged-in patron account
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    Promo code is actively enabled
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? "Saving..." : "Save Promo Code"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
