"use client";

import { useState, FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [btnText, setBtnText] = useState("Subscribe");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBtnText("Subscribed ✓");
    setTimeout(() => {
      setBtnText("Subscribe");
      setEmail("");
    }, 2500);
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        required
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-clay">
        {btnText}
      </button>
    </form>
  );
}
