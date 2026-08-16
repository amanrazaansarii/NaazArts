"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          type: inquiryType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setInquiryType("General inquiry");

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === "success" && (
        <div style={{ background: "var(--sage-tint)", color: "var(--sage-deep)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.9rem", border: "1px solid var(--sage)" }}>
          ✓ Thank you! Your message has reached our studio desk. We will get back to you shortly.
        </div>
      )}
      {status === "error" && (
        <div style={{ background: "var(--clay-tint)", color: "var(--clay-deep)", padding: "12px 16px", borderRadius: "8px", fontSize: "0.9rem", border: "1px solid var(--clay)" }}>
          ⚠ {errorMessage}
        </div>
      )}
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "submitting"}
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting"}
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={status === "submitting"}
      />
      <select
        value={inquiryType}
        onChange={(e) => setInquiryType(e.target.value)}
        disabled={status === "submitting"}
      >
        <option>General inquiry</option>
        <option>Custom order</option>
        <option>Wholesale / bulk jars</option>
        <option>Workshop question</option>
        <option>Workshop Registration</option>
      </select>
      <textarea
        placeholder="Your message"
        rows={5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={status === "submitting"}
      />
      <button type="submit" className="btn btn-clay" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending to studio..." : status === "success" ? "Message Sent ✓" : "Send message"}
      </button>
    </form>
  );
}
