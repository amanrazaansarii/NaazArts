"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  MessageCircle,
  Clock,
  CheckCircle,
  Archive,
  Trash2,
  Edit,
  X,
  ExternalLink,
  ChevronRight,
  Send,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Inspector Modal
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status & Notes editing
  const [status, setStatus] = useState<"NEW" | "IN_PROGRESS" | "RESPONDED" | "ARCHIVED">("NEW");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/inquiries?type=${typeFilter}&status=${statusFilter}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setSubmissions(json.submissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [typeFilter, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const openInspector = (inq: any) => {
    setSelectedInquiry(inq);
    setStatus(inq.status);
    setAdminNotes(inq.adminNotes || "");
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleSaveInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          adminNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update inquiry");
      }

      setMessage("Inquiry updated and follow-up notes saved!");
      fetchInquiries();
      setSelectedInquiry({
        ...selectedInquiry,
        status,
        adminNotes,
      });
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!confirm(`Delete message from ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) fetchInquiries();
    } catch {
      alert("Could not delete inquiry.");
    }
  };

  const getTypeBadgeStyle = (tp: string) => {
    switch (tp.toLowerCase()) {
      case "workshop registration":
      case "workshop question":
        return { background: "#E0E7FF", color: "#3730A3" };
      case "wholesale / bulk jars":
        return { background: "#FEF3C7", color: "#92400E" };
      case "custom order":
        return { background: "#FCE7F3", color: "#9D174D" };
      default:
        return { background: "#F4EFEB", color: "var(--ink-soft)" };
    }
  };

  const getStatusBadgeStyle = (st: string) => {
    switch (st) {
      case "NEW":
        return { background: "#FEE2E2", color: "#991B1B" };
      case "IN_PROGRESS":
        return { background: "#FEF3C7", color: "#92400E" };
      case "RESPONDED":
        return { background: "#D1FAE5", color: "#065F46" };
      case "ARCHIVED":
        return { background: "#F3F4F6", color: "#6B7280" };
      default:
        return { background: "#F4EFEB", color: "var(--ink-soft)" };
    }
  };

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
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            <input
              type="text"
              placeholder="Search sender, email, session..."
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* TYPE FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.85rem", padding: "8px 12px" }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Inquiry Types</option>
            <option value="General inquiry">General Inquiry</option>
            <option value="Custom order">Custom Order</option>
            <option value="Wholesale / bulk jars">Wholesale / Bulk Jars</option>
            <option value="Workshop Registration">Workshop Registration</option>
            <option value="Workshop question">Workshop Question</option>
          </select>

          {/* STATUS FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.85rem", padding: "8px 12px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New (Unread)</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESPONDED">Responded</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* INQUIRIES LIST / TABLE */}
      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Inquiry Category</th>
                <th>Message Snippet</th>
                <th>Workshop / Session</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Inspect & Reply</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    Loading studio submissions...
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>
                    No customer submissions found matching filters.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  const typeStyle = getTypeBadgeStyle(sub.type);
                  const statusStyle = getStatusBadgeStyle(sub.status);
                  return (
                    <tr key={sub.id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{sub.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--ink-soft)" }}>{sub.email}</div>
                          {sub.phone && (
                            <div style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}>{sub.phone}</div>
                          )}
                        </div>
                      </td>

                      <td>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            ...typeStyle,
                          }}
                        >
                          {sub.type}
                        </span>
                      </td>

                      <td style={{ maxWidth: "280px" }}>
                        <p style={{ fontSize: "0.85rem", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {sub.message}
                        </p>
                      </td>

                      <td>
                        {sub.workshopSession ? (
                          <span style={{ fontSize: "0.8rem", color: "var(--clay)", fontWeight: 600 }}>
                            {sub.workshopSession}
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>—</span>
                        )}
                      </td>

                      <td>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            ...statusStyle,
                          }}
                        >
                          {sub.status}
                        </span>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button
                            onClick={() => openInspector(sub)}
                            className="admin-btn admin-btn-secondary"
                            style={{ padding: "6px 10px", fontSize: "0.8rem" }}
                          >
                            <Edit size={13} /> Inspect & Reply
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(sub.id, sub.name)}
                            className="admin-btn admin-btn-danger"
                            style={{ padding: "6px 8px" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT & ACTION MODAL */}
      {isModalOpen && selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: "680px" }}>
            <div className="admin-modal-header">
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                  Customer Submission Details
                </h2>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600, ...getTypeBadgeStyle(selectedInquiry.type) }}>
                    {selectedInquiry.type}
                  </span>
                  <span style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, ...getStatusBadgeStyle(selectedInquiry.status) }}>
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveInquiry}>
              <div className="admin-modal-body">
                {message && (
                  <div style={{ padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", background: "var(--sage-tint)", color: "var(--sage-deep)", border: "1px solid var(--sage)" }}>
                    {message}
                  </div>
                )}

                {/* SENDER CONTACT INFO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#FCFAF7", padding: "14px", borderRadius: "10px", border: "1px solid rgba(43,38,34,0.06)" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", textTransform: "uppercase" }}>Sender Name</span>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{selectedInquiry.name}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", textTransform: "uppercase" }}>Email Address</span>
                    <div style={{ fontSize: "0.9rem", color: "var(--clay)", fontWeight: 600 }}>{selectedInquiry.email}</div>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", textTransform: "uppercase" }}>Phone Number</span>
                      <div style={{ fontSize: "0.88rem" }}>{selectedInquiry.phone}</div>
                    </div>
                  )}
                  {selectedInquiry.workshopSession && (
                    <div style={{ gridColumn: selectedInquiry.phone ? "auto" : "span 2" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", textTransform: "uppercase" }}>Registered Workshop Session</span>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--ink)" }}>{selectedInquiry.workshopSession}</div>
                    </div>
                  )}
                </div>

                {/* FULL MESSAGE BODY */}
                <div className="form-group">
                  <label className="form-label">Message Content</label>
                  <div
                    style={{
                      background: "#FCFAF7",
                      padding: "16px",
                      borderRadius: "10px",
                      border: "1px solid rgba(43,38,34,0.08)",
                      fontSize: "0.92rem",
                      lineHeight: 1.6,
                      color: "var(--ink)",
                    }}
                  >
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* STATUS & ADMIN NOTES */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Inquiry Status</label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e: any) => setStatus(e.target.value)}
                    >
                      <option value="NEW">New</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESPONDED">Responded</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Internal Studio Notes</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sent wholesale catalogue; awaiting response"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Naaz Arts Studio — Regarding your inquiry&body=Dear ${encodeURIComponent(selectedInquiry.name)},%0D%0A%0D%0AThank you for reaching out to Naaz Arts Studio.`}
                  className="admin-btn admin-btn-outline"
                  style={{ marginRight: "auto" }}
                >
                  <Mail size={14} /> Open Email Client
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? "Saving..." : "Save Status & Notes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
