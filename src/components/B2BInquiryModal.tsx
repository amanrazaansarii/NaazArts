'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { X, Send, CheckCircle, Factory } from 'lucide-react';

export const B2BInquiryModal: React.FC = () => {
  const { isInquiryOpen, closeInquiry, inquiryForm, setInquiryForm, resetInquiryForm } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isInquiryOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          resetInquiryForm();
          closeInquiry();
        }, 3000);
      } else {
        setErrorMsg(data.error || 'Failed to submit quote inquiry.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeInquiry}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <button
          onClick={closeInquiry}
          style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', color: 'var(--color-primary)' }}
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle size={56} color="var(--color-terracotta)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>B2B Quote Request Received!</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Thank you for reaching out to NaazArts. Your inquiry has been saved to our database, and our studio team will get back to you with wholesale pricing within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Factory size={22} color="var(--color-terracotta)" />
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                Wholesale & Custom Orders
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Request B2B Quote & Customization</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Are you a candle maker looking for custom vessels, or a business seeking hand-poured corporate gifts/decor? Fill out the details below for discounted volume rates.
            </p>

            {errorMsg && (
              <div style={{ padding: '0.8rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  value={inquiryForm.companyName}
                  onChange={(e) => setInquiryForm({ companyName: e.target.value })}
                  placeholder="e.g. Luminary Candle Co."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ email: e.target.value })}
                  placeholder="sarah@luminarycandles.com"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Product Category
                </label>
                <select
                  className="select-custom"
                  value={inquiryForm.productType}
                  onChange={(e) => setInquiryForm({ productType: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Candle Jars & Vessels">Candle Jars & Vessels (Wax Safe)</option>
                  <option value="Trays & Catchalls">Trays & Catchalls</option>
                  <option value="Candle Holders">Candle Holders & Bases</option>
                  <option value="Vases & Planters">Vases & Sculptural Decor</option>
                  <option value="Custom Mold Creation">Custom Mold Creation / Logo Embossing</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Estimated Quantity
                </label>
                <select
                  className="select-custom"
                  value={inquiryForm.estimatedQuantity}
                  onChange={(e) => setInquiryForm({ estimatedQuantity: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="25-50 units">25 - 50 units</option>
                  <option value="50-100 units">50 - 100 units (Standard B2B Tier)</option>
                  <option value="100-500 units">100 - 500 units (Volume Wholesale)</option>
                  <option value="500+ units">500+ units (Custom Production Batch)</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', display: 'block', marginBottom: '0.3rem' }}>
                  Customization Details (Color palette, logo debossing, sealing specs)
                </label>
                <textarea
                  rows={3}
                  value={inquiryForm.customizationDetails}
                  onChange={(e) => setInquiryForm({ customizationDetails: e.target.value })}
                  placeholder="Describe your color preferences (e.g. Marbled Rose + Warm Sand), hand-painted gold rim details, or wick size needed..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" disabled={loading} className="btn btn-terracotta" style={{ width: '100%', padding: '0.85rem' }}>
                  <Send size={16} />
                  <span>{loading ? 'Submitting Inquiry...' : 'Submit B2B Quote Request'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
