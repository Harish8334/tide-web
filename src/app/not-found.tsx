import React from 'react';
import Link from 'next/link';
import { Atom } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Tide Physics',
  description: 'The requested page could not be found. Return to Tide Physics Academy home page.',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #F8F9FE 0%, #FFFFFF 100%)',
        color: '#1E1B4B',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Branded Header */}
      <header
        style={{
          background: '#1E1B4B',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.15rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Atom size={22} color="#60A5FA" /> Tide Physics Academy
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link
              href="/"
              style={{
                color: '#CBD5E1',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Home
            </Link>
            <Link
              href="/courses"
              style={{
                color: '#CBD5E1',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Courses
            </Link>
            <Link
              href="/contact"
              style={{
                color: '#CBD5E1',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Main 404 Hero */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '5rem',
              fontWeight: 900,
              color: '#3B0C75',
              lineHeight: 1,
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#1E1B4B',
              marginBottom: '1rem',
            }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '2.25rem',
            }}
          >
            The page you are looking for doesn’t exist, has been removed, or is temporarily unavailable. 
            Return home to browse our coaching courses or contact admissions.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #3B0C75 0%, #261559 100%)',
                color: '#FFFFFF',
                padding: '0.85rem 1.85rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(59, 12, 117, 0.25)',
              }}
            >
              ← Return to Home
            </Link>
            <Link
              href="/courses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#FFFFFF',
                color: '#3B0C75',
                border: '1.5px solid #3B0C75',
                padding: '0.85rem 1.85rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Browse All Courses
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer
        style={{
          background: '#0F0C20',
          color: '#94A3B8',
          textAlign: 'center',
          padding: '1.5rem',
          fontSize: '0.85rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <p style={{ margin: 0 }}>© 2026 Tide Physics Academy. Premier Institute for CSIR-NET & GATE Physics.</p>
      </footer>
    </div>
  );
}
