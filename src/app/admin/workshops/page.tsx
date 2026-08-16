"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Edit,
  Users,
  MapPin,
  Clock,
  Check,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"In-person" | "Online">("In-person");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("₹2,499 per seat");
  const [priceValue, setPriceValue] = useState(2499);
  const [maxSeats, setMaxSeats] = useState(12);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/workshops");
      if (res.ok) {
        const json = await res.json();
        setWorkshops(json.workshops || []);
      }
    } catch (err) {
      console.error("Failed to fetch workshops", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentId(null);
    setTitle("");
    setType("In-person");
    setDate("Saturday, August 29, 2026 (11:00 AM – 03:00 PM)");
    setLocation("Naaz Arts Studio, Bandra West, Mumbai");
    setPrice("₹2,499 per seat");
    setPriceValue(2499);
    setMaxSeats(12);
    setBookedSeats(0);
    setDescription("Hands-on concrete art workshop. Learn silicone mold pouring, mineral pigments, and beeswax sealing.");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (w: any) => {
    setModalMode("edit");
    setCurrentId(w.id);
    setTitle(w.title);
    setType(w.type);
    setDate(w.date);
    setLocation(w.location);
    setPrice(w.price);
    setPriceValue(w.priceValue);
    setMaxSeats(w.maxSeats);
    setBookedSeats(w.bookedSeats);
    setDescription(w.description);
    setIsActive(w.isActive);
    setIsModalOpen(true);
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      type,
      date,
      location,
      price,
      priceValue: Number(priceValue),
      maxSeats: Number(maxSeats),
      bookedSeats: Number(bookedSeats),
      description,
      isActive,
    };

    try {
      const url = modalMode === "create" ? "/api/admin/workshops" : `/api/admin/workshops/${currentId}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchWorkshops();
      } else {
        alert("Failed to save workshop");
      }
    } catch {
      alert("Failed to save workshop");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteWorkshop = async (id: string, name: string) => {
    if (!confirm(`Delete workshop "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/workshops/${id}`, { method: "DELETE" });
      if (res.ok) fetchWorkshops();
    } catch {
      alert("Could not delete workshop");
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
            Scheduled Masterclasses & Workshops
          </h1>
          <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}>
            Manage in-person studio sessions and live Google Meet concrete art masterclasses.
          </p>
        </div>

        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <Plus size={16} />
          <span>Schedule New Session</span>
        </button>
      </div>

      {/* WORKSHOPS GRID */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
          Loading workshops...
        </div>
      ) : workshops.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <Calendar size={36} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <h3 style={{ fontFamily: "var(--font-display)" }}>No sessions scheduled</h3>
          <button onClick={openCreateModal} className="admin-btn admin-btn-primary" style={{ marginTop: "14px" }}>
            Schedule First Workshop
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
          {workshops.map((w) => {
            const seatsRemaining = Math.max(0, w.maxSeats - w.bookedSeats);
            const fillPercent = Math.min(100, Math.round((w.bookedSeats / w.maxSeats) * 100));

            return (
              <div key={w.id} className="admin-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        background: w.type === "In-person" ? "var(--clay-tint)" : "#E0E7FF",
                        color: w.type === "In-person" ? "var(--clay-deep)" : "#3730A3",
                      }}
                    >
                      {w.type} Session
                    </span>
                    <span className={`status-pill ${w.isActive ? "status-in-stock" : "status-unavailable"}`}>
                      {w.isActive ? "Active / Open" : "Closed"}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "8px" }}>
                    {w.title}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "var(--ink-soft)", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Calendar size={14} color="var(--clay)" />
                      <span>{w.date}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <MapPin size={14} color="var(--clay)" />
                      <span>{w.location}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.5, marginBottom: "14px" }}>
                    {w.description}
                  </p>

                  {/* SEATS CAPACITY BAR */}
                  <div style={{ background: "#FCFAF7", padding: "12px", borderRadius: "10px", border: "1px solid rgba(43,38,34,0.06)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>
                      <span>{w.bookedSeats} of {w.maxSeats} seats reserved</span>
                      <span style={{ color: seatsRemaining <= 2 ? "#EF4444" : "var(--clay)" }}>
                        {seatsRemaining} seats left
                      </span>
                    </div>
                    <div style={{ height: "6px", background: "#E5E7EB", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${fillPercent}%`, height: "100%", background: fillPercent >= 80 ? "#EF4444" : "var(--clay)", borderRadius: "999px" }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(43,38,34,0.06)", paddingTop: "12px" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {w.price}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => openEditModal(w)}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "6px 10px" }}
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWorkshop(w.id, w.title)}
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "6px 8px" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                {modalMode === "create" ? "Schedule Workshop Session" : "Edit Session Details"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveWorkshop}>
              <div className="admin-modal-body">
                <div className="form-group">
                  <label className="form-label">Session Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Offline Workshop — Tray & Vase Painting"
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Format</label>
                    <select
                      className="form-select"
                      value={type}
                      onChange={(e: any) => setType(e.target.value)}
                    >
                      <option value="In-person">In-person Studio</option>
                      <option value="Online">Online via Google Meet</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Price Label</label>
                    <input
                      type="text"
                      className="form-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Date & Time *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Saturday, August 29, 2026 (11:00 AM – 03:00 PM)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location / Platform Link *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Studio address or Google Meet invite note"
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Total Seats (Capacity)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={maxSeats}
                      onChange={(e) => setMaxSeats(Number(e.target.value))}
                      min={1}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Booked Seats</label>
                    <input
                      type="number"
                      className="form-input"
                      value={bookedSeats}
                      onChange={(e) => setBookedSeats(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  Workshop is active and open for bookings
                </label>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn admin-btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? "Saving..." : "Save Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
