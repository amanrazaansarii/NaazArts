"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Lock, CheckCircle2, UserCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, isAuthenticated } = useAuthStore();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in, show direct profile link
  if (isAuthenticated) {
    return (
      <div className="container auth-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <div className="auth-card" style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div className="auth-avatar-icon">
            <UserCheck size={36} />
          </div>
          <h2>You are already signed in</h2>
          <p className="body-text" style={{ margin: "10px 0 24px" }}>
            Welcome back to Naaz Arts studio! Manage your orders and profile below.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/profile" className="btn btn-clay">
              Go to My Profile →
            </Link>
            <Link href="/shop" className="btn btn-outline">
              Shop Pieces
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    if (mode === "signup" && !name) {
      setErrorMsg("Please enter your name.");
      return;
    }

    let result;
    if (mode === "login") {
      result = await login(email, password);
    } else {
      result = await signup(name, email, password);
    }

    if (result.success) {
      router.push("/profile");
    } else {
      setErrorMsg(result.error || "Authentication failed. Please try again.");
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg("");
    const res = await login("patron@naazarts.com", "StudioPatron2026!");
    if (res.success) {
      router.push("/profile");
    } else {
      setErrorMsg(res.error || "Failed to sign in demo account.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="container auth-container">
        <div className="auth-split-layout">
          {/* Left: Studio Brand & Patron Perks */}
          <div className="auth-perks-pane">
            <span className="eyebrow">Studio Community</span>
            <h2>Artisan pieces for thoughtful interiors</h2>
            <p className="body-text" style={{ margin: "14px 0 28px" }}>
              Join the Naaz Arts Patron Club to seamlessly track small-batch hand-casting cycles, save delivery destinations, and receive first notifications for limited holiday collections.
            </p>

            <div className="perks-list">
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <div>
                  <strong>Live #NAS-XXXXXX Tracking</strong>
                  <span>Watch your pieces progress from mold mixing to curing.</span>
                </div>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <div>
                  <strong>Private Workshop Priority</strong>
                  <span>Exclusive early booking window for offline studio sessions.</span>
                </div>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <div>
                  <strong>Saved Color Preferences</strong>
                  <span>Fast, frictionless studio checkout.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Auth Card */}
          <div className="auth-form-pane">
            <div className="auth-card">
              {/* Tab Switcher */}
              <div className="auth-tabs-bar">
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === "login" ? "is-active" : ""}`}
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${mode === "signup" ? "is-active" : ""}`}
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                  }}
                >
                  Create Account
                </button>
              </div>

              {/* Demo 1-Click Login Helper */}
              <button
                type="button"
                className="demo-login-banner"
                onClick={handleDemoLogin}
              >
                <Sparkles size={16} />
                <span>One-Click Demo Patron Sign In</span>
              </button>

              <form onSubmit={handleSubmit} className="auth-form">
                {mode === "signup" && (
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="auth-name">
                      Your Full Name
                    </label>
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                )}

                <div className="form-field-group">
                  <label className="field-label" htmlFor="auth-email">
                    Email Address
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="patron@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <div className="label-with-action">
                    <label className="field-label" htmlFor="auth-pass">
                      Password
                    </label>
                    {mode === "login" && (
                      <span className="forgot-pass-text">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <input
                    id="auth-pass"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                </div>

                {mode === "login" && (
                  <label className="remember-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember this device</span>
                  </label>
                )}

                {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

                <button type="submit" className="btn btn-clay auth-submit-btn">
                  <span>{mode === "login" ? "Sign In" : "Create Studio Account"}</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="auth-terms-note">
                By continuing, you agree to Naaz Arts Studio Terms of Service and Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
