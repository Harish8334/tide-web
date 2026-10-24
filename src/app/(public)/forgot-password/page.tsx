'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        background: 'linear-gradient(180deg, #F8F9FE 0%, #FFFFFF 100%)',
      }}
    >
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(30, 27, 75, 0.08)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <KeyRound size={28} color="#0056D2" />
          </div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#1E1B4B',
              marginBottom: '0.5rem',
            }}
          >
            Reset Your Password
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.5 }}>
            Enter your registered student email address. We’ll send you password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '8px',
              padding: '1.25rem',
              textAlign: 'center',
              color: '#166534',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>Recovery Email Sent!</div>
            <p style={{ fontSize: '0.88rem', margin: 0 }}>
              If an account exists for <strong>{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                marginTop: '1.25rem',
                color: '#3B0C75',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="resetEmail"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '0.4rem',
                }}
              >
                Student / Registered Email Address *
              </label>
              <input
                id="resetEmail"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                aria-label="Student / Registered Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #3B0C75 0%, #261559 100%)',
                color: '#FFFFFF',
                padding: '0.85rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59, 12, 117, 0.25)',
              }}
            >
              {loading ? 'Sending Instructions...' : 'Send Recovery Link'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <Link
                href="/login"
                style={{
                  fontSize: '0.88rem',
                  color: '#673DE6',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                ← Return to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
