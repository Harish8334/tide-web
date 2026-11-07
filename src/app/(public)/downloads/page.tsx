// src/app/(public)/downloads/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, BookOpen, Video, CheckCircle2, Phone, Sparkles, Rocket } from 'lucide-react';

const DOWNLOAD_ITEMS = [
  {
    title: 'UG TRB Physics Official Syllabus & Unit Weightage Blueprint',
    category: 'Syllabus & Blueprint',
    size: '1.8 MB',
    format: 'PDF',
    description: 'Detailed analysis of Samacheer Kalvi and graduate level core undergraduate topics: Mechanics, Thermodynamics, Optics, Electricity & Magnetism.',
  },
  {
    title: 'PG TRB Physics Sample Theory Notes & Solved Derivations',
    category: 'Sample Notes',
    size: '4.2 MB',
    format: 'PDF',
    description: 'Bilingual Tamil & English chapter notes covering Quantum Mechanics, Statistical Dynamics, Classical Mechanics, and Electrodynamics.',
  },
  {
    title: '10-Year Solved TRB Previous Year Questions (PYQs)',
    category: 'Previous Questions',
    size: '5.6 MB',
    format: 'PDF',
    description: 'Complete 10-year question bank with detailed line-by-line faculty solutions, shortcuts, and repeated examination observation patterns.',
  },
  {
    title: 'High-Yield Physics Formula Pocket Handbook',
    category: 'Formula Compendium',
    size: '2.4 MB',
    format: 'PDF',
    description: 'Comprehensive formula summary for fast revision: Quantum operators, thermodynamic potentials, electromagnetic wave relations, and nuclear decay equations.',
  },
  {
    title: 'Education & Psychology TRB 300+ Model MCQs Practice Set',
    category: 'Pedagogy & GK',
    size: '2.1 MB',
    format: 'PDF',
    description: 'Child Development, Educational Psychology, and Teaching Methodology questions aligned with the latest TRB exam structure.',
  },
  {
    title: 'State Ranking CBT Test Series — Sample 3-Hour Offline OMR Exam Paper',
    category: 'Mock Exam Sample',
    size: '3.1 MB',
    format: 'PDF',
    description: 'Full-length 150-question model mock paper designed on the recent TRB Exam Board question weightage pattern.',
  },
];

export default function DownloadsPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #3B0C75 50%, #590FB3 100%)', color: '#FFFFFF', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, color: '#FFD700', marginBottom: '1.25rem' }}>
            <Sparkles size={16} /> FREE ACADEMIC STUDY COMPENDIUM
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>
            Free Demo Class, Sample Notes &amp; Exams
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', maxWidth: '720px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Download verified syllabus blueprints, sample printed study materials, formula compendiums, and previous year exam questions curated by our expert faculty.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FF5500 100%)', color: '#FFFFFF', padding: '0.85rem 1.85rem', fontWeight: 800, borderRadius: '8px' }}>
              Explore Live &amp; Offline Batches <Rocket size={16} style={{ marginLeft: 6, display: 'inline' }} />
            </Link>
            <a href="tel:9994854604" className="btn btn-outline" style={{ border: '2px solid #FFFFFF', color: '#FFFFFF', padding: '0.85rem 1.85rem', fontWeight: 700, borderRadius: '8px' }}>
              <Phone size={16} style={{ marginRight: 6, display: 'inline' }} /> Helpline: 9994854604
            </a>
          </div>
        </div>
      </section>

      {/* Materials List */}
      <section style={{ maxWidth: '1240px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {DOWNLOAD_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ background: '#EFF6FF', color: '#0056D2', fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                    {item.format} • {item.size}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 0.65rem', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.55, margin: '0 0 1.5rem' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={15} /> Free Direct Download
                </span>
                <a
                  href="/downloads"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Starting direct download for: ${item.title}`);
                  }}
                  style={{
                    background: '#0056D2',
                    color: '#FFFFFF',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Download size={15} /> Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doorstep Delivery Promo */}
      <section style={{ maxWidth: '1240px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <span style={{ background: '#FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
              Postal Service
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E1B4B', margin: '0.65rem 0 1rem' }}>
              📚 PRINTED NOTES – DOORSTEP DELIVERY
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Get comprehensive, exam-oriented printed study materials delivered directly to your doorstep through postal service.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
              {['✔ Detailed Topic-Wise Notes', '✔ Previous Year Questions (PYQs)', '✔ Expected Questions & Concepts', '✔ Observation Patterns', '✔ Formulae & Numericals', '✔ Full Exam Preparation'].map((bullet, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: '#1E293B', fontWeight: 600 }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E1B4B', marginBottom: '0.5rem' }}>
              Order Your Printed Study Kit
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Shipped within 24 hours to any district in Tamil Nadu.
            </p>
            <a
              href="tel:9994854604"
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #0056D2 0%, #2563EB 100%)',
                color: '#FFFFFF',
                padding: '0.8rem 1.75rem',
                borderRadius: '8px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Phone size={16} /> Call Helpline: 9994854604
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
