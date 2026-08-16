"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles, Lock, Mail } from "lucide-react";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Successful login
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("creativenaaz.business@gmail.com");
    setPassword("StudioMaster2026!");
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8F5F0 0%, #EFE8DC 100%)",
        padding: "24px",
      }}
    >
      <div
        className="admin-card"
        style={{
          maxWidth: "440px",
          width: "100%",
          padding: "36px 32px",
          borderRadius: "20px",
          boxShadow: "0 16px 36px rgba(43, 38, 34, 0.08)",
        }}
      >
        {/* LOGO & TITLE */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "var(--clay)",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              fontWeight: 700,
              margin: "0 auto 16px",
              boxShadow: "0 8px 20px rgba(193, 112, 78, 0.3)",
            }}
          >
            N
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "4px" }}>
            Naaz Arts Studio Console
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
            Director & artisan management access
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "var(--clay-tint)",
              color: "var(--clay-deep)",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              marginBottom: "18px",
              border: "1px solid var(--clay)",
            }}
          >
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Director Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: "36px" }}
                placeholder="creativenaaz.business@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Studio Master Key / Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: "36px" }}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
            style={{ height: "46px", fontSize: "0.95rem", marginTop: "8px" }}
          >
            {loading ? "Authenticating..." : "Access Studio Console"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* 1-CLICK QUICK ACCESS DEMO HELPER */}
        <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(43,38,34,0.08)", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleFillDemo}
            className="admin-btn admin-btn-secondary"
            style={{ width: "100%", fontSize: "0.82rem", padding: "8px" }}
          >
            <Sparkles size={14} color="var(--clay)" /> Fill Master Key Credentials
          </button>

          <div style={{ marginTop: "14px" }}>
            <Link href="/" style={{ fontSize: "0.8rem", color: "var(--ink-soft)", textDecoration: "none" }}>
              ← Return to public storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
