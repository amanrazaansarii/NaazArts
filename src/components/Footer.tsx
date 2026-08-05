'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Mail, Shield, Award } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const { openInquiry } = useStore();

  return (
    <footer style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-sand-light)', marginTop: '4rem' }}>
      {/* Brand Value Props Banner */}
      <div style={{ borderBottom: '1px solid rgba(239, 224, 211, 0.15)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Sparkles size={24} color="var(--color-terracotta-light)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--color-sand)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>Small Batch Poured</h4>
              <p style={{ color: 'var(--color-stone)', fontSize: '0.82rem' }}>Handcrafted with intention. Every single piece is unique in tactile texture.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Shield size={24} color="var(--color-terracotta-light)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--color-sand)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>Wax & Heat Sealed</h4>
              <p style={{ color: 'var(--color-stone)', fontSize: '0.82rem' }}>Internally sealed for candle makers and water resistance.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Award size={24} color="var(--color-terracotta-light)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--color-sand)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>B2B & Retail Supply</h4>
              <p style={{ color: 'var(--color-stone)', fontSize: '0.82rem' }}>Wholesale pricing tiers for small business owners and bulk orders.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '4rem 0 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
        {/* Brand Info */}
        <div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-sand)', display: 'block', marginBottom: '0.4rem' }}>
            NaazArts
          </span>
          <p style={{ color: 'var(--color-stone)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
            Pouring small batches with intentions is our core. Premium concrete trays, candle vessels, jars, vases, and custom DIY craft projects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'var(--color-sand)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Shop & Explore
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
            <li><Link href="/" style={{ color: 'var(--color-stone)' }}>Home</Link></li>
            <li><Link href="/shop" style={{ color: 'var(--color-stone)' }}>All Products Catalog</Link></li>
            <li><Link href="/b2b" style={{ color: 'var(--color-stone)' }}>Candle Makers & B2B Jars</Link></li>
            <li><button onClick={() => openInquiry()} style={{ color: 'var(--color-terracotta-light)', fontWeight: 600 }}>Request Bulk Quote</button></li>
            <li><Link href="/about" style={{ color: 'var(--color-stone)' }}>Our Story</Link></li>
          </ul>
        </div>

        {/* B2B Services */}
        <div>
          <h4 style={{ color: 'var(--color-sand)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            B2B & Customization
          </h4>
          <p style={{ color: 'var(--color-stone)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
            We specialize in hand-painted detailing, custom pigments, and bulk candle vessel pouring for boutique candle brands.
          </p>
          <button onClick={() => openInquiry()} className="btn btn-terracotta btn-sm">
            <span>B2B Quote Inquiry</span>
          </button>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: 'var(--color-sand)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Small Batch Drops
          </h4>
          <p style={{ color: 'var(--color-stone)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
            Subscribe to get notified when new hand-poured colors and limited DIY batches drop.
          </p>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: '0.6rem',
                fontSize: '0.85rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'var(--color-sand)',
                color: 'var(--color-primary)',
                flexGrow: 1
              }}
            />
            <button className="btn btn-terracotta btn-sm" style={{ padding: '0.6rem 0.8rem' }}>
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ borderTop: '1px solid rgba(239, 224, 211, 0.15)', padding: '1.5rem 0', textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-stone)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <span>© {new Date().getFullYear()} NaazArts. All rights reserved. Hand-poured with intention.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Designed & Developed with <Heart size={14} color="var(--color-terracotta-light)" /> for Concrete Art Enthusiasts
          </span>
        </div>
      </div>
    </footer>
  );
};
