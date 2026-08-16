"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Check, ArrowRight } from "lucide-react";

export function WorkshopsClient() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/workshops")
      .then((res) => (res.ok ? res.json() : { workshops: [] }))
      .then((data) => {
        setWorkshops(data.workshops || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    setSubmitting(true);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          type: "Workshop Registration",
          workshopSession: `${selectedSession.title} (${selectedSession.date})`,
          message: message || `Booking seat for ${selectedSession.title}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit booking");

      setSuccessMsg("Registration received! Our studio coordinator will contact you with payment and seat confirmation.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => {
        setSelectedSession(null);
        setSuccessMsg(null);
      }, 6000);
    } catch (err: any) {
      alert(err.message || "Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="workshop-cards-grid">
            {loading ? (
              <p className="body-text" style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                Loading available masterclasses...
              </p>
            ) : workshops.length === 0 ? (
              <div className="tile" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                <h3>No upcoming sessions scheduled</h3>
                <p className="body-text">Check back soon or send us an inquiry for private bookings.</p>
              </div>
            ) : (
              workshops.map((w) => {
                const seatsLeft = Math.max(0, w.maxSeats - w.bookedSeats);
                return (
                  <div key={w.id} className="tile" style={{ textAlign: "left", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span className="eyebrow">{w.type} session</span>
                      <h3 style={{ margin: "8px 0 10px", fontSize: "1.2rem" }}>{w.title}</h3>
                      <p className="body-text" style={{ marginBottom: "16px", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        {w.description}
                      </p>
                      <p className="body-text" style={{ marginBottom: "6px", fontSize: "0.88rem" }}>
                        <strong>Date:</strong> {w.date}
                      </p>
                      <p className="body-text" style={{ marginBottom: "6px", fontSize: "0.88rem" }}>
                        <strong>Location:</strong> {w.location}
                      </p>
                      <p className="body-text" style={{ marginBottom: "18px", fontSize: "0.88rem", color: "var(--clay)", fontWeight: 700 }}>
                        <strong>Price:</strong> {w.price} ({seatsLeft} seats remaining)
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedSession(w)}
                      className="btn btn-clay"
                      style={{ alignSelf: "flex-start", cursor: "pointer" }}
                    >
                      Reserve your seat →
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {selectedSession && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(43,38,34,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span className="eyebrow">Seat Reservation</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", marginTop: "4px" }}>
                  {selectedSession.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>{selectedSession.date}</p>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--ink-soft)" }}
              >
                ×
              </button>
            </div>

            {successMsg ? (
              <div style={{ background: "var(--sage-tint)", color: "var(--sage-deep)", padding: "16px", borderRadius: "10px", textAlign: "center", border: "1px solid var(--sage)" }}>
                <p style={{ fontWeight: 600, fontSize: "0.95rem" }}>✓ {successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devika Singhania"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. devika@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>Phone Number / WhatsApp (for confirmation) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98200 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>Special notes / Number of seats</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Booking 2 seats for me and my sister..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--line)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-clay"
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  {submitting ? "Confirming Seat..." : "Submit Reservation"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
