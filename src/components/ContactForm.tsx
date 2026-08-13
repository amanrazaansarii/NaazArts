"use client";

import { useState, FormEvent } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [btnText, setBtnText] = useState("Send message");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBtnText("Message Sent ✓");
    setTimeout(() => {
      setBtnText("Send message");
      setName("");
      setEmail("");
      setMessage("");
      setInquiryType("General inquiry");
    }, 2500);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        value={inquiryType}
        onChange={(e) => setInquiryType(e.target.value)}
      >
        <option>General inquiry</option>
        <option>Custom order</option>
        <option>Wholesale / bulk jars</option>
        <option>Workshop question</option>
      </select>
      <textarea
        placeholder="Your message"
        rows={5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-clay">
        {btnText}
      </button>
    </form>
  );
}
