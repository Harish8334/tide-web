// src/app/(public)/results/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Award, Rocket, Phone, Star, CheckCircle, Video } from 'lucide-react';

const SUCCESS_STUDENTS = [
  {
    exam: 'UG TRB-2024',
    name: 'VENU PRIYA T',
    score: '120',
    regNo: 'Reg.NO:435030218',
    image: '/images/results/venu-priya.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'BHUVANESWARI S',
    score: '103.5',
    regNo: 'Reg.NO:438010032',
    image: '/images/results/bhuvaneswari.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'AMBIKA',
    score: '102.5',
    regNo: 'Reg.NO:412030148',
    image: '/images/results/ambika.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'KILLIVALAVAN G',
    score: '101.5',
    regNo: 'Reg.NO:436010176',
    image: '/images/results/killivalavan.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'KARUNANITHI',
    score: '101',
    regNo: 'Reg.NO:429010011',
    image: '/images/results/karunanithi.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'VINOTHKUMAR A',
    score: '100.5',
    regNo: 'Reg.NO:406020025',
    image: '/images/results/vinothkumar.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'GOPINATH',
    score: '99',
    regNo: 'Reg.NO:434010247',
    image: '/images/results/gopinath.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'SELVAPRIYA',
    score: '95.5',
    regNo: 'Reg.NO:422050449',
    image: '/images/results/selvapriya.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'HEMA MAALINI R',
    score: '95.5',
    regNo: 'Reg.NO:437030074',
    image: '/images/results/hema-maalini.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'AYYAPPAN S',
    score: '93.5',
    regNo: 'Reg.NO:417040069',
    image: '/images/results/ayyappan.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'BALAJI R',
    score: '88.5',
    regNo: 'Reg.NO:429010028',
    image: '/images/results/balaji.png',
  },
];

export default function ResultsPage() {
  return (
    <div style={{ background: '#0B0F19', color: '#FFFFFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero */}
      <section style={{ padding: '4.5rem 1.5rem 3rem', background: 'linear-gradient(135deg, #1E1B4B 0%, #3B0C75 50%, #590FB3 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, color: '#FFD700', marginBottom: '1.25rem' }}>
            <Trophy size={16} /> STATE TOP RANKERS 3, 4, 9 • 100+ SELECTIONS
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 1rem' }}>
            Our Success Students BIO — UG TRB-2024
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 2rem' }}>
            Celebrating the extraordinary dedication of our teachers who cleared the Tamil Nadu Teachers Recruitment Board examinations with top marks.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FF5500 100%)', padding: '0.85rem 1.85rem', fontWeight: 800, borderRadius: '8px', color: '#FFFFFF' }}>
              Join Next Batch <Rocket size={16} style={{ marginLeft: 6, display: 'inline' }} />
            </Link>
            <a href="tel:9994854604" className="btn btn-outline" style={{ border: '2px solid #FFFFFF', color: '#FFFFFF', padding: '0.85rem 1.85rem', fontWeight: 700, borderRadius: '8px' }}>
              <Phone size={16} style={{ marginRight: 6, display: 'inline' }} /> Talk to Counselors
            </a>
          </div>
        </div>
      </section>

      {/* Grid of Results */}
      <section style={{ maxWidth: '1240px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ background: '#1E293B', color: '#38BDF8', fontSize: '0.8rem', fontWeight: 800, padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase' }}>
            Official Hall of Fame
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.5rem' }}>
            UG TRB-2024 Outstanding Performers
          </h2>
          <p style={{ color: '#94A3B8' }}>
            Verified registration numbers and scores secured in the TRB Board Examination.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
          {SUCCESS_STUDENTS.map((stu, i) => (
            <div
              key={i}
              style={{
                background: '#131D31',
                border: '1px solid #1E293B',
                borderRadius: '16px',
                padding: '1.75rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s',
              }}
            >
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #FFB800',
                  marginBottom: '1rem',
                  background: '#1E293B',
                }}
              >
                <img
                  src={stu.image}
                  alt={stu.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <span style={{ background: '#1E293B', color: '#38BDF8', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', marginBottom: '0.5rem' }}>
                {stu.exam}
              </span>

              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FFB800', lineHeight: 1.1 }}>
                {stu.score}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.75rem' }}>
                Score Secured
              </div>

              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                {stu.name}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontFamily: 'monospace', background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: '4px' }}>
                {stu.regNo}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section style={{ maxWidth: '1240px', margin: '4rem auto 0', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{ background: '#131D31', border: '1px solid #1E293B', borderRadius: '20px', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 1rem' }}>
            Watch Aspirant Interviews &amp; Classroom Sessions on YouTube
          </h2>
          <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '0 auto 2rem' }}>
            Subscribe to our official YouTube channel for free TRB Physics problem solving tricks, previous year questions (PYQs) analysis, and motivational guidance.
          </p>
          <a
            href="https://www.youtube.com/@TIDE_PHYSICS_TVM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#DC2626',
              color: '#FFFFFF',
              fontWeight: 800,
              padding: '0.9rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Video size={18} /> Visit @TIDE_PHYSICS_TVM
          </a>
        </div>
      </section>
    </div>
  );
}
