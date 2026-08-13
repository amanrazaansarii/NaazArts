"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/workshops", label: "Workshops" },
    { href: "/our-story", label: "Our story" },
    { href: "/contact", label: "Custom" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        Naaz Arts
      </Link>

      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={`${link.href}-${index}`}
              href={link.href}
              className={isActive ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
