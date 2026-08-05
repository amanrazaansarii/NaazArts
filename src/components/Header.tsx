'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cart, openCart, toggleSearch, openInquiry } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--color-bg)' }}>
      {/* Announcement Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-sand-light)',
          fontSize: '0.75rem',
          padding: '0.45rem 1rem',
          textAlign: 'center',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem'
        }}
      >
        <Sparkles size={13} style={{ color: 'var(--color-terracotta-light)' }} />
        <span>Hand-Poured Small Batches • B2B Candle Vessels & Wholesale Pricing Available</span>
        <Sparkles size={13} style={{ color: 'var(--color-terracotta-light)' }} />
      </div>

      {/* Main Navigation Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(255, 250, 242, 0.95)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-height)' }}>
          {/* Mobile menu button */}
          <button
            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="mobile-only"
          >
            {mobileMenuOpen ? <X size={24} color="var(--color-primary)" /> : <Menu size={24} color="var(--color-primary)" />}
          </button>

          {/* Logo / Brand Name */}
          <Link
            href="/"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.1rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}
            >
              NaazArts
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--color-terracotta)',
                fontWeight: 600,
                marginTop: '2px'
              }}
            >
              Handmade Concrete Decor
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
            <Link
              href="/"
              style={{
                fontSize: '0.85rem',
                fontWeight: pathname === '/' ? 700 : 500,
                color: pathname === '/' ? 'var(--color-terracotta)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Home
            </Link>

            <Link
              href="/shop"
              style={{
                fontSize: '0.85rem',
                fontWeight: pathname === '/shop' ? 700 : 500,
                color: pathname === '/shop' ? 'var(--color-terracotta)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Shop Catalog
            </Link>

            <Link
              href="/b2b"
              style={{
                fontSize: '0.85rem',
                fontWeight: pathname === '/b2b' ? 700 : 500,
                color: pathname === '/b2b' ? 'var(--color-terracotta)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>B2B & Wholesale</span>
              <span
                style={{
                  fontSize: '0.6rem',
                  backgroundColor: 'var(--color-terracotta)',
                  color: 'white',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '999px',
                  fontWeight: 600
                }}
              >
                Candle Jars
              </span>
            </Link>

            <button
              onClick={() => openInquiry('Custom Bulk Decor')}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <SlidersHorizontal size={14} color="var(--color-terracotta)" />
              <span>Custom & Bulk Quote</span>
            </button>

            <Link
              href="/about"
              style={{
                fontSize: '0.85rem',
                fontWeight: pathname === '/about' ? 700 : 500,
                color: pathname === '/about' ? 'var(--color-terracotta)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Our Story
            </Link>
          </nav>

          {/* Action Controls (Search & Cart) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <button
              onClick={toggleSearch}
              style={{ padding: '0.4rem', color: 'var(--color-primary)' }}
              title="Search store"
            >
              <Search size={20} />
            </button>

            <button
              onClick={openCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-sand)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-stone-light)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ShoppingBag size={18} color="var(--color-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Shop Catalog
            </Link>
            <Link
              href="/b2b"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-terracotta)' }}
            >
              B2B & Wholesale Jars
            </Link>
            <button
              onClick={() => { setMobileMenuOpen(false); openInquiry(); }}
              style={{ textAlign: 'left', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Custom & Bulk Order Quote
            </button>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}
            >
              Our Story
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};
