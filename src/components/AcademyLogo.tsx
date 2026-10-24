// src/components/AcademyLogo.tsx
import React from 'react';

export default function AcademyLogo({ size = 42 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect width="44" height="44" rx="10" fill="url(#academyGrad)" />
      <rect
        x="0.75"
        y="0.75"
        width="42.5"
        height="42.5"
        rx="9.25"
        stroke="#FFB800"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      {/* Central Quantum Core */}
      <circle cx="22" cy="22" r="4.25" fill="#FFB800" />
      <circle cx="22" cy="22" r="1.8" fill="#FFFFFF" />
      {/* Orbital Ellipses representing Physics & Quantum Mechanics */}
      <ellipse
        cx="22"
        cy="22"
        rx="14.5"
        ry="5"
        stroke="#FFFFFF"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        transform="rotate(-30 22 22)"
      />
      <ellipse
        cx="22"
        cy="22"
        rx="14.5"
        ry="5"
        stroke="#FFB800"
        strokeOpacity="0.85"
        strokeWidth="1.5"
        transform="rotate(30 22 22)"
      />
      <ellipse
        cx="22"
        cy="22"
        rx="14.5"
        ry="5"
        stroke="#C4B5FD"
        strokeOpacity="0.95"
        strokeWidth="1.5"
        transform="rotate(90 22 22)"
      />
      <defs>
        <linearGradient id="academyGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E1B4B" />
          <stop offset="0.55" stopColor="#3B0C75" />
          <stop offset="1" stopColor="#590FB3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
