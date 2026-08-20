"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Footer() {
  const pathname = usePathname();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <span>&copy; {year || "2026"} Naaz Arts</span>
      <span>
        <Link href="/contact">Wholesale</Link>
        <Link href="/policies">Policies</Link>
        <Link href="/contact">FAQ</Link>
        <a
          href="https://instagram.com/shop.naazarts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <Link href="/contact">Contact</Link>
      </span>
    </footer>
  );
}
