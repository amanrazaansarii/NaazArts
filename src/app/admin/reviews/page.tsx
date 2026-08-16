"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Plus,
  Search,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Share2,
  Eye,
  Filter,
} from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerAvatar, setCustomerAvatar] = useState("");
  const [source, setSource] = useState("Instagram");
  const [sourceUrl, setSourceUrl] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [reviewDate, setReviewDate] = useState("August 2026");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/reviews?source=${sourceFilter}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setReviews(json.reviews || []);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sourceFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReviews();
  };

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentId(null);
    setCustomerName("");
    setCustomerAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80");
    setSource("Instagram");
    setSourceUrl("");
    setRating(5);
    setReviewText("");
    setProductSlug("marble-tray-sage");
    setReviewDate("August 2026");
    setIsFeatured(false);
    setIsPublished(true);
    setMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (rev: any) => {
    setModalMode("edit");
    setCurrentId(rev.id);
    setCustomerName(rev.customerName);
    setCustomerAvatar(rev.customerAvatar || "");
    setSource(rev.source);
    setSourceUrl(rev.sourceUrl || "");
    setRating(rev.rating || 5);
    setReviewText(rev.reviewText);
    setProductSlug(rev.productSlug || "");
    setReviewDate(rev.reviewDate || "August 2026");
    setIsFeatured(rev.isFeatured);
    setIsPublished(rev.isPublished);
    setMessage(null);
    setIsModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      customerName,
      customerAvatar: customerAvatar || null,
      source,
      sourceUrl: sourceUrl || null,
      rating,
      reviewText,
      productSlug: productSlug || null,
      reviewDate,
      isFeatured,
      isPublished,
    };

    try {
      const url = modalMode === "create" ? "/api/admin/reviews" : `/api/admin/reviews/${currentId}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save review");
      }

      setMessage({ text: "Review saved and synchronized with website!", type: "success" });
      setTimeout(() => {
        setIsModalOpen(false);
        fetchReviews();
      }, 900);
    } catch (err: any) {
      setMessage({ text: err.message || "An error occurred", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (id: string, currentPublished: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentPublished }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error("Failed to toggle publish status", err);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error("Failed to toggle featured status", err);
    }
  };

  const handleDeleteReview = async (id: string, name: string) => {
    if (!confirm(`Delete review from ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) fetchReviews();
    } catch {
      alert("Could not delete review.");
    }
  };

  const getSourceBadgeStyle = (src: string) => {
    switch (src.toLowerCase()) {
      case "instagram":
        return { background: "#FCE7F3", color: "#BE185D" };
      case "whatsapp":
        return { background: "#D1FAE5", color: "#065F46" };
      case "google":
        return { background: "#DBEAFE", color: "#1E40AF" };
      case "pinterest":
        return { background: "#FEE2E2", color: "#991B1B" };
      default:
        return { background: "#F4EFEB", color: "var(--ink-soft)" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* HEADER & CONTROLS */}
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
              placeholder="Search by customer name, quote..."
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
          {/* SOURCE FILTER */}
          <select
            className="form-select"
            style={{ width: "auto", fontSize: "0.85rem", padding: "8px 12px" }}
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="ALL">All Social Sources</option>
            <option value="Instagram">Instagram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Google">Google Reviews</option>
            <option value="Pinterest">Pinterest</option>
            <option value="Website">Direct Website</option>
            <option value="Studio Visitor">Studio Visitor</option>
          </select>

          <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Social Media Review</span>
          </button>
        </div>
      </div>

      {/* REVIEWS GRID CARDS */}
      {loading ? (
        <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-faint)" }}>
          Loading social media reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <MessageSquare size={36} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "4px" }}>No reviews found</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginBottom: "16px" }}>
            Add customer feedback extracted from your Instagram DMs, WhatsApp messages, or Google reviews.
          </p>
          <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
            <Plus size={14} /> Add First Review
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
          {reviews.map((rev) => {
            const badgeStyle = getSourceBadgeStyle(rev.source);
            return (
              <div key={rev.id} className="admin-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
                <div>
                  {/* TOP HEADER */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {rev.customerAvatar ? (
                        <img
                          src={rev.customerAvatar}
                          alt={rev.customerName}
                          style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: "var(--clay-tint)",
                            color: "var(--clay-deep)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {rev.customerName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{rev.customerName}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>{rev.reviewDate}</div>
                      </div>
                    </div>

                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        ...badgeStyle,
                      }}
                    >
                      {rev.source}
                    </span>
                  </div>

                  {/* STARS */}
                  <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={15}
                        fill={s <= rev.rating ? "#F59E0B" : "none"}
                        color={s <= rev.rating ? "#F59E0B" : "#D1D5DB"}
                      />
                    ))}
                  </div>

                  {/* REVIEW QUOTE */}
                  <p style={{ fontSize: "0.88rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.5, marginBottom: "8px" }}>
                    &ldquo;{rev.reviewText}&rdquo;
                  </p>

                  {/* LINKED PRODUCT IF ANY */}
                  {rev.productSlug && (
                    <div style={{ fontSize: "0.75rem", color: "var(--clay)", fontWeight: 600 }}>
                      Product: {rev.productSlug}
                    </div>
                  )}
                </div>

                {/* BOTTOM CONTROLS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(43,38,34,0.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleTogglePublished(rev.id, rev.isPublished)}
                      title={rev.isPublished ? "Visible on live store (Click to unpublish)" : "Draft / Hidden (Click to publish)"}
                      style={{
                        border: "none",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: rev.isPublished ? "var(--sage-tint)" : "#F3F4F6",
                        color: rev.isPublished ? "var(--sage-deep)" : "#6B7280",
                      }}
                    >
                      {rev.isPublished ? "✓ Published" : "Hidden"}
                    </button>

                    <button
                      onClick={() => handleToggleFeatured(rev.id, rev.isFeatured)}
                      title={rev.isFeatured ? "Featured on homepage spotlight" : "Standard review"}
                      style={{
                        border: "none",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: rev.isFeatured ? "var(--clay-tint)" : "#F3F4F6",
                        color: rev.isFeatured ? "var(--clay-deep)" : "#6B7280",
                      }}
                    >
                      {rev.isFeatured ? "★ Featured" : "Standard"}
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => openEditModal(rev)}
                      className="admin-btn-secondary"
                      style={{ padding: "5px 8px", borderRadius: "6px" }}
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(rev.id, rev.customerName)}
                      className="admin-btn-danger"
                      style={{ padding: "5px 8px", borderRadius: "6px" }}
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

      {/* ADD / EDIT REVIEW MODAL */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                {modalMode === "create" ? "Add Social Media Review" : "Edit Customer Review"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveReview}>
              <div className="admin-modal-body">
                {message && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      background: message.type === "success" ? "var(--sage-tint)" : "var(--clay-tint)",
                      color: message.type === "success" ? "var(--sage-deep)" : "var(--clay-deep)",
                    }}
                  >
                    {message.text}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Customer Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Kavya Sharma / @kavyainteriors"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Social Platform Source *</label>
                    <select
                      className="form-select"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    >
                      <option>Instagram</option>
                      <option>WhatsApp</option>
                      <option>Google</option>
                      <option>Pinterest</option>
                      <option>Website</option>
                      <option>Studio Visitor</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Customer Avatar / Photo URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://images.unsplash.com/... or image link"
                    value={customerAvatar}
                    onChange={(e) => setCustomerAvatar(e.target.value)}
                  />
                </div>

                {/* STAR RATING PICKER */}
                <div className="form-group">
                  <label className="form-label">Star Rating (1 to 5)</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          padding: "4px",
                        }}
                      >
                        <Star
                          size={24}
                          fill={s <= rating ? "#F59E0B" : "none"}
                          color={s <= rating ? "#F59E0B" : "#D1D5DB"}
                        />
                      </button>
                    ))}
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, marginLeft: "8px", alignSelf: "center" }}>
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div className="form-group">
                  <label className="form-label">Customer Testimonial / Feedback Quote *</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="e.g. The marble tray is breathtaking in person..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div className="form-group">
                    <label className="form-label">Associated Product Slug (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. marble-tray-sage"
                      value={productSlug}
                      onChange={(e) => setProductSlug(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Review Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={reviewDate}
                      onChange={(e) => setReviewDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* TOGGLES */}
                <div style={{ display: "flex", gap: "20px", background: "#FCFAF7", padding: "12px", borderRadius: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                    />
                    Publish on Website Storefront
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    Feature in Homepage Spotlight
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? "Saving..." : modalMode === "create" ? "Add to Reviews" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
