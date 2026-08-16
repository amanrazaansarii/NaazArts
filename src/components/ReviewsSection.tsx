"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquareHeart } from "lucide-react";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reviews?featured=true")
      .then((res) => (res.ok ? res.json() : { reviews: [] }))
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="section" style={{ background: "#FDFBF8", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div className="section-title">
          <span className="eyebrow">Studio Patron Stories</span>
          <h2>Loved by collectors & homes worldwide</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "32px" }}>
          {reviews.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: "var(--card)",
                padding: "28px 24px",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                boxShadow: "0 4px 16px rgba(43, 38, 34, 0.04)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= rev.rating ? "#F59E0B" : "none"}
                        color={s <= rev.rating ? "#F59E0B" : "#E5E7EB"}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--ink-faint)", textTransform: "uppercase", fontWeight: 600 }}>
                    via {rev.source}
                  </span>
                </div>

                <p style={{ fontSize: "0.92rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)", marginBottom: "12px" }}>
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid rgba(43,38,34,0.06)", paddingTop: "12px" }}>
                {rev.customerAvatar ? (
                  <img
                    src={rev.customerAvatar}
                    alt={rev.customerName}
                    style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "var(--tone-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "var(--ink)",
                    }}
                  >
                    {rev.customerName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{rev.customerName}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>{rev.reviewDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
